//Library

import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import { validationResult } from "express-validator";

//Models

import { registerValidation } from './validations/auth.js';
import checkAuth from "./utils/checkAuth.js";
import userModel from "./models/User.js";
import user from "./models/User.js";

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

app.post('/auth/login',async (req,res) =>{

    try {
        //request for search data in database

        const user = await userModel.findOne({email:req.body.email});

        //searching user data
        if (!user){
            return res.status(404).json({
                message:'Пользователь не найден',
            });
        }

        //compiling user password (passwordHash in Password)
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        
        //searching user login and password
        if (!isValidPass){
            return res.status(400).json({
                message:'Неверный Логин или Пароль',
            });
        }

        //Add token on id data
        const token = jwt.sign({
            _id: user._id,
        },
        'secret',
        {
            expiresIn:'30d', //delete token for 30 days
        }
    );

    //Convert and sort request results

    const {passwordHash, ... userData} = user._doc;

        //Request Results DataBase

        res.json({
            ...userData,
            token,
            success:true,
        });
        

    } catch (error) {

        console.log(error);

        //error code pattern for users site (authorization data in db)
        res.status(500).json
        ({
            message:'Не удалось авторизоваться',
            success:false,
        });
    }


});

    //MainLogisticCode for add data in MongoDB (Registration)

app.post('/auth/register',registerValidation , async (req,res)=> {

    try {
        
        //Errors on request (400 HTTP Request error )
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
    
        //Hash Password Backend

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
     
    //              Docs bcrypt, error async/await(typescript)
    
    // const hashPassword = async (password, saltRounds = 10) => {
    //     try {
    //       // Generate a salt
    //       const salt = await bcrypt.genSalt(saltRounds)
      
    //       // Hash password
    //       return await bcrypt.hash(password, salt)
    //     } catch (error) {
    //       console.log(error)
    //     }
      
    //     // Return null if error
    //     return null
    //   }
    
        //Model request
    const doc = new userModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
    });

    //Add data in database and save here

    const user = await doc.save();

    //Add token on id data
    const token = jwt.sign({
        _id: user._id,
    },
    'secret',
    {
        expiresIn:'30d', //delete token for 30 days
    }
    )
    
    //Convert and sort request results

    const {passwordHash, ... userData} = user._doc;
        //Request Results DataBase

        res.json({
            ... userData,
            token,
            success:true,
        });
        
    //test post request

    // res.json({
    //     success:true,
    // });

    //Error HTTP 500
 
    } catch (error) { 
        //console code pattern error for authorization data in db
        console.log(error);

        //error code pattern for users site (authorization data in db)
        res.status(500).json
        ({
            message:'Не удалось зарегистрироваться',
            success:false,
        });
    }
});


app.get('/auth/me',checkAuth, async (req,res) => {
    try {
            const user = await userModel.findById(req.userId);

            if(!user)
            {
                return res.status(404).json({
                    message:'пользователь не найден'
                });
            }
            const {passwordHash, ... userData} = user._doc;

            res.json(userData);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:'ошибка',
        })
    }
});


//Server

app.listen(444,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('server ok')
});