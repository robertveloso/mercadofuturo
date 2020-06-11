"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(process.env.PORT || 3333, () => {
  console.log(
    `⚡️  Server listening on ${process.env.PROTOCOL || 'http'}://${process.env
      .HOST || 'api.mercado-futuro.com'}:${process.env.PORT || '3333'}`
  );
});
