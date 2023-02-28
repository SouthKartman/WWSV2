"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _multer = _interopRequireDefault(require("multer"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _react = _interopRequireDefault(require("react"));

var _validations = require("./validations.js");

var _index = require("./utils/index.js");

var _index2 = require("./controllers/index.js");

var _assert = require("assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { BrowserRouter } from 'react-router-dom';
_mongoose["default"];

_mongoose["default"].set('strictQuery', true);

_mongoose["default"].connect('mongodb+srv://admin:wwwwww@cluster0.aarwuzf.mongodb.net/blog?retryWrites=true&w=majority').then(function () {
  return console.log('DB connect');
})["catch"](function (err) {
  return console.log('DB error', err);
});

var app = (0, _express["default"])();

var storage = _multer["default"].diskStorage({
  destination: function destination(_, __, cb) {
    if (!_fs["default"].existsSync('uploads')) {
      _fs["default"].mkdirSync('uploads');
    }

    cb(null, 'uploads');
  },
  filename: function filename(_, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use('/uploads', _express["default"]["static"]('uploads'));
app.post('/auth/login', _validations.loginValidation, _index.handleValidationErrors, _index2.UserController.login);
app.post('/auth/register', _validations.registerValidation, _index.handleValidationErrors, _index2.UserController.register);
app.get('/auth/me', _index.checkAuth, _index2.UserController.getMe);
app.post('/upload', _index.checkAuth, upload.single('image'), function (req, res) {
  res.json({
    url: "/uploads/".concat(req.file.originalname)
  });
});
app.get('/tags', _index2.PostController.getLastTags);
app.get('/posts', _index2.PostController.getAll);
app.get('/posts/tags', _index2.PostController.getLastTags);
app.get('/posts/:id', _index2.PostController.getOne);
app.post('/posts', _index.checkAuth, _validations.postCreateValidation, _index.handleValidationErrors, _index2.PostController.create);
app["delete"]('/posts/:id', _index.checkAuth, _index2.PostController.remove);
app.patch('/posts/:id', _index.checkAuth, _validations.postCreateValidation, _index.handleValidationErrors, _index2.PostController.update);
app.listen(process.env.PORT || 444, function (err) {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});