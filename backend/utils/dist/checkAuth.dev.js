"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(req, res, next) {
  var token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      var decoded = _jsonwebtoken["default"].verify(token, 'secret');

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа'
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа'
    });
  } // res.send(token);
  // console.log(token);
  // next(); 

};

exports["default"] = _default;