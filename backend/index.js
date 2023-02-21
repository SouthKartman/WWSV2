import express from "express";

const app = express();

app.get('/',(req,res) => {
    res.send('111hello world');
});

app.listen(444,(err)=>{
    if(err){
        return console.log(err);
    }

    console.log('server ok')
});

