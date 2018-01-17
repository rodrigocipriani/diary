/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
  apiPort: process.env.PORT || 5000,
  secret: process.env.SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config;
} else {
  // we are in development - return the dev keys!!!
  var devConfig = __webpack_require__(10); // eslint-disable-line global-require

  module.exports = Object.assign(config, devConfig);
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = __webpack_require__(15);

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModel = function (_Schema) {
  _inherits(UserModel, _Schema);

  function UserModel() {
    var _this;

    _classCallCheck(this, UserModel);

    var userSchema = (_this = _possibleConstructorReturn(this, (UserModel.__proto__ || Object.getPrototypeOf(UserModel)).call(this, {
      email: {
        type: String,
        unique: true,
        lowercase: true
      },
      password: String
    })), _this);

    userSchema.pre('save', _this.preSave);
    userSchema.methods.comparePassword = _this.comparePassword;
    return _this;
  }

  // On Save hook, encrypt password
  // Before saving a model, run this function


  _createClass(UserModel, [{
    key: 'preSave',
    value: function preSave(next) {
      // get access to the user model
      var user = this;

      // generate a salt then run callback
      _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }

        // hash (encrypt) our password using the salt
        _bcryptNodejs2.default.hash(user.password, salt, null, function (errHash, hash) {
          if (errHash) {
            return next(errHash);
          }

          // overwrite plain texxt password with encrypted password
          user.password = hash;
          return next();
        });
        return false;
      });
    }
  }, {
    key: 'comparePassword',
    value: function comparePassword(candidatePassword, callback) {
      _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
          return callback(err);
        }

        return callback(null, isMatch);
      });
    }
  }]);

  return UserModel;
}(_mongoose.Schema);

exports.default = _mongoose2.default.model('UserModel', new UserModel());

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

var _express = __webpack_require__(6);

var _express2 = _interopRequireDefault(_express);

var _http = __webpack_require__(7);

var _http2 = _interopRequireDefault(_http);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = __webpack_require__(9);

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DB setup
 */
_mongoose2.default.connect(_config2.default.mongoURI);

/**
 * App setup
 */


/**
 * Call passport configurations
 */
var app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));
app.use(_bodyParser2.default.json({ type: '*/*' }));

app.get('/', function (req, res) {
  res.send('Diary API');
});

// requiring routes
// todo: transform to automatic request for Routes
__webpack_require__(16)(app);
__webpack_require__(20)(app);

/**
 * Server setup
 */
var server = _http2.default.createServer(app);
server.listen(_config2.default.apiPort, function () {
  console.log('Server runing on port ' + _config2.default.apiPort);
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  apiPort: process.env.PORT || 5000,
  secret: 'lksadfnjlaskfjnlk32498234n2kjn',
  googleClientID: '352663565833-gu3kth2upuj64mhqp5t9l0he1pnkfm9g.apps.googleusercontent.com',
  googleClientSecret: 'qykRId2w7F1hM_JovgkOSypM',
  // mongoURI: 'mongodb://192.168.99.100:27017/auth',
  // mongoURI: 'mongodb://192.168.99.100:27017/diary',
  mongoURI: 'mongodb://mongo:27017/diary'
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _passport = __webpack_require__(2);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(12);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(13);

var _passportGoogleOauth = __webpack_require__(14);

var _UserModel = __webpack_require__(3);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * GOOGLE STRATEGY
 */
var googleLogin = new _passportGoogleOauth.Strategy({
  clientID: _config2.default.googleClientID,
  clientSecret: _config2.default.googleClientSecret,
  callbackURL: '/api/auth/google/callback',
  proxy: true
}, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, done) {
    var existingUser, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('profile', profile);
            _context.next = 3;
            return _UserModel2.default.findOne({ googleId: profile.id });

          case 3:
            existingUser = _context.sent;

            console.log('existingUser', existingUser);

            if (!existingUser) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', done(null, existingUser));

          case 7:
            _context.next = 9;
            return new _UserModel2.default({ googleId: profile.id, email: profile.email }).save();

          case 9:
            user = _context.sent;
            return _context.abrupt('return', done(null, user));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * LOCAL STRATEGY
 */
// Create local strategy
var localOptions = {
  usernameField: 'email'
};
var localLogin = new _passportLocal2.default(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the corret email and password
  // otherwise, call done with false
  _UserModel2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function (errComparePassword, isMatch) {
      if (errComparePassword) {
        return done(errComparePassword);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
    return false;
  });
});

/**
 * JWT Strategy
 */
// Setup options for SWT Strategy
var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
  secretOrKey: _config2.default.secret
};

// Create JWT strategy
var jwtLogin = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  _UserModel2.default.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

// Tell passport to use this passport
_passport2.default.use(jwtLogin);
_passport2.default.use(localLogin);
_passport2.default.use(googleLogin);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth20");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _NoteController = __webpack_require__(17);

var _NoteController2 = _interopRequireDefault(_NoteController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var API_PREFIX = '/note';

module.exports = function (app) {
  return app.get(API_PREFIX + '/list', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _NoteController2.default.list();

            case 2:
              list = _context.sent;
              return _context.abrupt('return', res.send(list));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _NoteService = __webpack_require__(18);

var _NoteService2 = _interopRequireDefault(_NoteService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var list;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _NoteService2.default.list();

        case 2:
          list = _context.sent;
          return _context.abrupt('return', list);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bluebird = __webpack_require__(19);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.list = function () {
  return new _bluebird2.default(function (resolve, reject) {
    var mock = ['aaa', 'bbb', 'ccc'];
    resolve(mock);
  });
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _passport = __webpack_require__(2);

var _passport2 = _interopRequireDefault(_passport);

var _AuthController = __webpack_require__(21);

var _AuthController2 = _interopRequireDefault(_AuthController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });
var requireSignin = _passport2.default.authenticate('local', { session: false });

var API_PREFIX = '/auth';

module.exports = function (app) {
  app.get(API_PREFIX + '/', requireAuth, function (req, res) {
    res.send({ hi: 'there', user: req.user });
  });

  app.post(API_PREFIX + '/signin', requireSignin, _AuthController2.default.signin);
  app.post(API_PREFIX + '/signup', _AuthController2.default.signup);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jwtSimple = __webpack_require__(22);

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _UserModel = __webpack_require__(3);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenForUseruser = function tokenForUseruser(user) {
  var timestamp = new Date().getTime();
  return _jwtSimple2.default.encode({ sub: user.id, iat: timestamp }, _config2.default.secret);
};

exports.signin = function (req, res) {
  // User has already had their email and password auth'd
  // We just neew to give them a token
  res.send({ token: tokenForUseruser(req.user) });
};

exports.signup = function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;


  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // See ir a user eith the given email exists
  _UserModel2.default.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    var user = new _UserModel2.default({
      email: email, password: password
    });
    user.save(function (errSave) {
      if (errSave) {
        return next(errSave);
      }

      // Responde to request indicanting the user was created
      return res.json({ token: tokenForUseruser(user) });
    });
    return false;
  });
  return false;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("jwt-simple");

/***/ })
/******/ ]);