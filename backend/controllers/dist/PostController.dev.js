"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.remove = exports.getOne = exports.getAll = exports.getLastTags = void 0;

var _Post = _interopRequireDefault(require("../models/Post.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLastTags = function getLastTags(req, res) {
  var posts, tags;
  return regeneratorRuntime.async(function getLastTags$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Post["default"].find().limit(5).exec());

        case 3:
          posts = _context.sent;
          tags = posts.map(function (obj) {
            return obj.tags;
          }).flat().slice(0, 5);
          res.json(tags);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Не удалось получить тэги'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getLastTags = getLastTags;

var getAll = function getAll(req, res) {
  var posts;
  return regeneratorRuntime.async(function getAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Post["default"].find().populate('user').exec());

        case 3:
          posts = _context2.sent;
          res.json(posts);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAll = getAll;

var getOne = function getOne(req, res) {
  var postId;
  return regeneratorRuntime.async(function getOne$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            postId = req.params.id;

            _Post["default"].findOneAndUpdate({
              _id: postId
            }, {
              $inc: {
                viewsCount: 1
              }
            }, {
              returnDocument: 'after'
            }, function (err, doc) {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  message: 'Не удалось вернуть статью'
                });
              }

              if (!doc) {
                return res.status(404).json({
                  message: 'Статья не найдена'
                });
              }

              res.json(doc);
            }).populate('user');
          } catch (err) {
            console.log(err);
            res.status(500).json({
              message: 'Не удалось получить статьи'
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getOne = getOne;

var remove = function remove(req, res) {
  var postId;
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            postId = req.params.id;

            _Post["default"].findOneAndDelete({
              _id: postId
            }, function (err, doc) {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  message: 'Не удалось удалить статью'
                });
              }

              if (!doc) {
                return res.status(404).json({
                  message: 'Статья не найдена'
                });
              }

              res.json({
                success: true
              });
            });
          } catch (err) {
            console.log(err);
            res.status(500).json({
              message: 'Не удалось получить статьи'
            });
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.remove = remove;

var create = function create(req, res) {
  var doc, post;
  return regeneratorRuntime.async(function create$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          doc = new _Post["default"]({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId
          });
          _context5.next = 4;
          return regeneratorRuntime.awrap(doc.save());

        case 4:
          post = _context5.sent;
          res.json(post);
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: 'Не удалось создать статью'
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.create = create;

var update = function update(req, res) {
  var postId;
  return regeneratorRuntime.async(function update$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          postId = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_Post["default"].updateOne({
            _id: postId
          }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags.split(',')
          }));

        case 4:
          res.json({
            success: true
          });
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            message: 'Не удалось обновить статью'
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.update = update;