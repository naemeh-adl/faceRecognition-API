const Clarifai = require('clarifai');
const apiHandler=(req,res)=>{
const app = new Clarifai.App({
    apiKey: process.env.API_KEY
   });
   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
   .then(data=>{res.json(data)
    
})
   .catch(err=>{
    res.status(400).json("Error in clarifai API")});
}
const imageHandler=(req, res, db)=>{
    const{id}=req.body;
    let found=false;
    debugger;
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>{
        res.status(400).json('error');
    });
}
module.exports={
    imageHandler:imageHandler,
    apiHandler:apiHandler
}