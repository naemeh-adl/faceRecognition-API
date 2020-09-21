const express=require('express');
const bodyParser=require('body-parser');
var cors = require('cors');
//const { json } = require('body-parser');
const app=express();
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn.js');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const saltRounds = 10;
app.use(express.json());
app.use(cors());
const knex=require('knex');
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '821367',
      database : 'smartbrain'
    }
  });
app.get('/',(req, res)=>{
   // res.json(dataBase.users);
   db.select('*').from('users')
   .then(users=>{res.json(users)}
   )
   .catch(err=>{res.status(400).json('Error finding users!')});
});
app.post('/signIn', (req, res)=>{signIn.signInHandler(req, res, db, bcrypt)});
app.post('/register',(req,res)=>{register.registerHandler(req, res, db, bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.profileHandlerGet(req, res, db)});
app.put('/image', (req, res)=>{image.imageHandler(req, res, db)});
app.post('/imageUrl', (req, res)=>{image.apiHandler(req, res)});
app.listen(process.env.PORT||3000, ()=>{
    console.log('App is running on port '+process.env.PORT
    );
});
