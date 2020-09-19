const signInHandler = (req, res, db, bcrypt)=>{
    const {password,email}=req.body;
    if(!password || !email){
        return res.status(400).json('Invlid data');
    }
    db.select('email', 'hash').from('login')
    .where('email','=', email)
    .then(data=>{
        const isValid=bcrypt.compareSync(password,data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user=>{
                res.json(user[0]);
            })
            .catch(err=>{
                res.status(400).json('Error finding user');
            });
        }
        else{
            res.status(400).json('wrong credentials!');
        }
    })
    .catch(err=>{
        res.status(400).json('wrong credentials!');
    })
    // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    //     // result == true
    // });
}
module.exports={
signInHandler:signInHandler
}