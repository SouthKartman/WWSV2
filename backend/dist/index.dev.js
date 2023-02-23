"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireWildcard(require("bcrypt"));

var _expressValidator = require("express-validator");

var _auth = require("./validations/auth.js");

var _checkAuth = _interopRequireDefault(require("./utils/checkAuth.js"));

var _User = _interopRequireDefault(require("./models/User.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

app.post('/auth/login', function _callee(req, res) {
  var _user, isValidPass, token, _user$_doc, passwordHash, userData;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: req.body.email
          }));

        case 3:
          _user = _context.sent;

          if (_user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Пользователь не найден'
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, _user._doc.passwordHash));

        case 8:
          isValidPass = _context.sent;

          if (isValidPass) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Неверный Логин или Пароль'
          }));

        case 11:
          //Add token on id data
          token = _jsonwebtoken["default"].sign({
            _id: _user._id
          }, 'secret', {
            expiresIn: '30d' //delete token for 30 days

          }); //Convert and sort request results

          _user$_doc = _user._doc, passwordHash = _user$_doc.passwordHash, userData = _objectWithoutProperties(_user$_doc, ["passwordHash"]); //Request Results DataBase

          res.json(_objectSpread({}, userData, {
            token: token,
            success: true
          }));
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); //error code pattern for users site (authorization data in db)

          res.status(500).json({
            message: 'Не удалось авторизоваться',
            success: false
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); //MainLogisticCode for add data in MongoDB (Registration)

app.post('/auth/register', _auth.registerValidation, function _callee2(req, res) {
  var errors, password, salt, _hash, doc, _user2, token, _user2$_doc, passwordHash, userData;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          //Errors on request (400 HTTP Request error )
          errors = (0, _expressValidator.validationResult)(req);

          if (errors.isEmpty()) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json(errors.array()));

        case 4:
          //Hash Password Backend
          password = req.body.password;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 7:
          salt = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

        case 10:
          _hash = _context2.sent;
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
          doc = new _User["default"]({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: _hash
          }); //Add data in database and save here

          _context2.next = 14;
          return regeneratorRuntime.awrap(doc.save());

        case 14:
          _user2 = _context2.sent;
          //Add token on id data
          token = _jsonwebtoken["default"].sign({
            _id: _user2._id
          }, 'secret', {
            expiresIn: '30d' //delete token for 30 days

          }); //Convert and sort request results

          _user2$_doc = _user2._doc, passwordHash = _user2$_doc.passwordHash, userData = _objectWithoutProperties(_user2$_doc, ["passwordHash"]); //Request Results DataBase

          res.json(_objectSpread({}, userData, {
            token: token,
            success: true
          })); //test post request
          // res.json({
          //     success:true,
          // });
          //Error HTTP 500

          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          //console code pattern error for authorization data in db
          console.log(_context2.t0); //error code pattern for users site (authorization data in db)

          res.status(500).json({
            message: 'Не удалось зарегистрироваться',
            success: false
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
app.get('/auth/me', _checkAuth["default"], function _callee3(req, res) {
  var _user3, _user3$_doc, passwordHash, userData;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findById(req.userId));

        case 3:
          _user3 = _context3.sent;

          if (_user3) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'пользователь не найден'
          }));

        case 6:
          _user3$_doc = _user3._doc, passwordHash = _user3$_doc.passwordHash, userData = _objectWithoutProperties(_user3$_doc, ["passwordHash"]);
          res.json(userData);
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: 'ошибка'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //Server

app.listen(444, function (err) {
  if (err) {
    return console.log(err);
  }

  console.log('server ok');
});