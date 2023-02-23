//Library
import express from "express";
import mongoose from "mongoose";

//Models

import { registerValidation, loginValidation, postCreateValidation } from './validations/auth.js';
import checkAuth from "./utils/checkAuth.js";
// import user from "./models/User.js";

//Functions

import * as UserControl from "./controlers/UserControler.js";
import * as PostController from "./controlers/PostController.js";

//This Start Main Code


    //DataBase Connection

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.aarwuzf.mongodb.net/blog?retryWrites=true&w=majority',)
.then(() => console.log('DB connect'))
.catch((err) => console.log('DB error', err));

    //Initialization Library Express

const app = express();

app.use(express.json());


app.get('/',(req,res) => {
    res.send('111hello world');
});

//Backend requests

    //Autherization

app.post('/auth/login',loginValidation, UserControl.login);

    //MainLogisticCode for add data in MongoDB (Registration)

app.post('/auth/register',registerValidation , UserControl.register);

    //Checkin Users

app.get('/auth/me',checkAuth, UserControl.getMe);


//Post

// app.get('/posts',PostController.getAll);
// app.get('/posts:id', PostController.getOne);
app.post('/posts', checkAuth,postCreateValidation, PostController.create);
// app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);



//Server

app.listen(444,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('server ok')
});