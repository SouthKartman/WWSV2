<<<<<<< HEAD
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
=======
//Library
import express from "express";
import mongoose from "mongoose";
import React from 'react';
>>>>>>> 19efaf3c70a84569aa3174fdda0da6681ad200fe

import mongoose from 'mongoose';

<<<<<<< HEAD
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
=======
import { registerValidation, loginValidation, postCreateValidation } from './validations/auth.js';
import { BrowserRouter } from 'react-router-dom';
import checkAuth from "./utils/checkAuth.js";
// import user from "./models/User.js";
>>>>>>> 19efaf3c70a84569aa3174fdda0da6681ad200fe

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

mongoose
  mongoose.set('strictQuery', true);
  mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.aarwuzf.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('DB connect'))
  .catch((err) => console.log('DB error', err));

const app = express();


app.get('/',(req,res) => {
  res.send('111hello world');
});

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(process.env.PORT || 444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
