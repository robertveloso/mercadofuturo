"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _path = require('path');
// import { v4 } from 'uuid';
// import { mkdir } from 'shelljs';

exports. default = {
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      let destination = _path.resolve.call(void 0, __dirname, '..', '..', 'tmp', 'uploads'); // ../../tmp/uploads/
      // destination = resolve(destination, v4());
      // mkdir('-p', destination);
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      _crypto2.default.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        /*const str = file.originalname
          .replace(/[^a-z0-9Ã¡Ã©Ã­Ã³ÃºÃ±Ã¼.,_-]/gim, '')
          .trim();
        return cb(null, str);*/
        return cb(null, res.toString('hex') + _path.extname.call(void 0, file.originalname));
      });
    },
  }),
};
