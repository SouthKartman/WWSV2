import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.aarwuzf.mongodb.net/?retryWrites=true&w=majority',)
.then(() => console.log('DB connect'))
.catch((err) => console.log('DB error', err));


const app = express();

app.use(express.json());


app.get('/',(req,res) => {
    res.send('111hello world');
});

app.post('/auth/login',(req,res)=>{
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullname: 'Вася Пупкин',
    },
      'secret123',
    );
    res.json({
        success:true,
        token,
    });
});

app.listen(444,(err)=>{
    if(err){
        return console.log(err);
    }

    console.log('server ok')
});