"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _url = require('url'); var _url2 = _interopRequireDefault(_url);
var _datefns = require('date-fns'); // startOfHour, parseISO, isBefore, format
var _pt = require('date-fns/locale/pt'); var _pt2 = _interopRequireDefault(_pt);

const Helper = {};

Helper.buildHost = () => {
  if (process.env.APP_URL) return process.env.APP_URL;
  const formatUrl = () =>
    _url2.default.format({
      protocol: process.env.PROTOCOL || 'http',
      hostname: process.env.HOST || '127.0.0.1',
      port: process.env.PORT || 3333,
      pathname: '',
    });

  return formatUrl();
};

Helper.formatDate = date => {
  return _datefns.format.call(void 0, date, "'dia' dd 'de' MMMM', às' H:mm'h'", { locale: _pt2.default });
};

exports. default = Helper;
