"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('./bootstrap');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path');
var _redis = require('redis'); var _redis2 = _interopRequireDefault(_redis);
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);
var _ratelimitredis = require('rate-limit-redis'); var _ratelimitredis2 = _interopRequireDefault(_ratelimitredis);
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);
var _node = require('@sentry/node'); var Sentry = _interopRequireWildcard(_node);
require('express-async-errors');

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _sentry = require('./config/sentry'); var _sentry2 = _interopRequireDefault(_sentry);

require('./database');

var _redis3 = require('./config/redis'); var _redis4 = _interopRequireDefault(_redis3);

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    Sentry.init(_sentry2.default);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(_helmet2.default.call(void 0, ));
    if (process.env.NODE_ENV !== 'development') {
      this.server.use(_cors2.default.call(void 0, { origin: 'https://www.mercado-futuro.com' }));
    } else {
      this.server.use(_cors2.default.call(void 0, { origin: 'http://localhost:3000' }));
    }

    this.server.use(_express2.default.json());
    this.server.use(
      '/files',
      _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development')
      this.server.use(
        new (0, _expressratelimit2.default)({
          store: new (0, _ratelimitredis2.default)({
            client: _redis2.default.createClient({
              host: _redis4.default.host,
              port: _redis4.default.port,
            }),
          }),
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      );
  }

  routes() {
    this.server.use(_routes2.default);

    // The error handler must be before any other error middleware
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const { status, message } = err;

      if (status && status !== 500)
        return res.status(status).json({ error: message });

      if (['development', 'test'].includes(process.env.NODE_ENV)) {
        const errors = await new (0, _youch2.default)(err, req).toJSON();

        console.error(err);

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

exports. default = new App().server;
