"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCreateValidation = exports.loginValidation = exports.registerValidation = void 0;

var _expressValidator = require("express-validator");

var registerValidation = [(0, _expressValidator.body)('email', 'Неверный формат почты').isEmail(), (0, _expressValidator.body)('password', 'Пароль должен быть не менее 5 символов').isLength({
  min: 5
}), (0, _expressValidator.body)('fullName', 'Укажите свое имя').isLength({
  min: 3
}), (0, _expressValidator.body)('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()];
exports.registerValidation = registerValidation;
var loginValidation = [(0, _expressValidator.body)('email', 'Неверный формат почты').isEmail(), (0, _expressValidator.body)('password', 'Пароль должен быть не менее 5 символов').isLength({
  min: 5
})];
exports.loginValidation = loginValidation;
var postCreateValidation = [(0, _expressValidator.body)('title', 'Введите заголовок статьи').isLength({
  min: 3
}), (0, _expressValidator.body)('text', 'Введите текст статьи').isLength({
  min: 10
}), (0, _expressValidator.body)('tags', 'Неверный формат тегов (укажите массив)').optional().isString(), (0, _expressValidator.body)('imageUrl', 'Неверная ссылка на изображение').optional().isString()];
exports.postCreateValidation = postCreateValidation;