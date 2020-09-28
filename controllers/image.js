const Clarifai = require('clarifai');
const apiHandler=(req,res)=>{
    console.log("yyyyyyyyyyyyyyy",req.body.url);
const app = new Clarifai.App({
    apiKey: '326b9f94bd604ef2ba9756c8dff7892f'
   });
   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
   .then(data=>res.json(data))
   .catch(res.status(400).json('Api is not working!'));
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