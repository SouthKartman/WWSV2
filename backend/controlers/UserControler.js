import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";


import userModel from "../models/User.js";



//Registration

export const register = async (req,res)=> {

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
};


//Autherization

export const login = async (req,res) =>{

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


};


export const getMe =  async (req,res) => {
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
}