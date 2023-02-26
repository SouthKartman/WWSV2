"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.getAll = void 0;

var _Post = _interopRequireDefault(require("../models/Post.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAll = function getAll(req, res) {
  var posts;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Post["default"].find());

        case 3:
          posts = _context.sent;
          res.json(posts);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(err);
          res.status(500).json({
            message: 'не удалось получить статью'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAll = getAll;

var create = function create(req, res) {
  var doc, post;
  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          doc = new _Post["default"]({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(doc.save());

        case 4:
          post = _context2.sent;
          res.json(post);
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Ошибка валидации и создания поста'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.create = create;