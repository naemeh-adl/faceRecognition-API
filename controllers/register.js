
const registerHandler=(req, res, db, bcrypt)=>{
    console.log('ttttttttttttttttttttt',process.env.DATABASE_URL);
    const {name,password,email}=req.body;
    if(!name || !password || !email){
        return res.status(400).json('Invlid data');
    }
    const hash= bcrypt.hashSync(password);
    //console.log(hash);
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login').returning('email')
        .then(loginEmail=>{
           return trx('users') 
           .returning('*')
           .insert({
                name:name,
                email:loginEmail[0],
                joined:new Date()
            })
            .then(user=>{
                res.json(user[0])
            })
            
    }).then(trx.commit)
    .catch(trx.rollback);
})
.catch(err=>res.status(400).json(err));
}
module.exports={
    registerHandler:registerHandler
}