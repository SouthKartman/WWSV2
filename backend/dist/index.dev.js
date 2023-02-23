"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _auth = require("./validations/auth.js");

var _checkAuth = _interopRequireDefault(require("./utils/checkAuth.js"));

var UserControl = _interopRequireWildcard(require("./controlers/UserControler.js"));

var PostController = _interopRequireWildcard(require("./controlers/PostController.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Library
//Models
// import user from "./models/User.js";
//Functions
//This Start Main Code
//DataBase Connection
_mongoose["default"].set('strictQuery', false);

_mongoose["default"].connect('mongodb+srv://admin:wwwwww@cluster0.aarwuzf.mongodb.net/blog?retryWrites=true&w=majority').then(function () {
  return console.log('DB connect');
})["catch"](function (err) {
  return console.log('DB error', err);
}); //Initialization Library Express


var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.send('111hello world');
}); //Backend requests
//Autherization

app.post('/auth/login', _auth.loginValidation, UserControl.login); //MainLogisticCode for add data in MongoDB (Registration)

app.post('/auth/register', _auth.registerValidation, UserControl.register); //Checkin Users

app.get('/auth/me', _checkAuth["default"], UserControl.getMe); //Post
// app.get('/posts',PostController.getAll);
// app.get('/posts:id', PostController.getOne);

app.post('/posts', _checkAuth["default"], _auth.postCreateValidation, PostController.create); // app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);
//Server

app.listen(444, function (err) {
  if (err) {
    return console.log(err);
  }

  console.log('server ok');
});