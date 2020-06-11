import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
// import { v4 } from 'uuid';
// import { mkdir } from 'shelljs';

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let destination = resolve(__dirname, '..', '..', 'tmp', 'uploads'); // ../../tmp/uploads/
      // destination = resolve(destination, v4());
      // mkdir('-p', destination);
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        /*const str = file.originalname
          .replace(/[^a-z0-9Ã¡Ã©Ã­Ã³ÃºÃ±Ã¼.,_-]/gim, '')
          .trim();
        return cb(null, str);*/
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
