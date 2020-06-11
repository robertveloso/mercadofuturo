"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

// import Cache from '../../lib/Cache';

class UserController {
  async store(req, res) {
    const emailExists = await _User2.default.findOne({
      where: { email: req.body.email },
    });
    const handleExists = await _User2.default.findOne({
      where: { handle: req.body.handle },
    });
    const documentExists = await _User2.default.findOne({
      where: { document: req.body.document },
    });

    if (emailExists)
      return res.status(400).json({ error: 'user/email-already-exists' });
    if (handleExists)
      return res.status(400).json({ error: 'user/handle-already-exists' });
    if (documentExists)
      return res.status(400).json({ error: 'user/document-already-exists' });

    const { id, handle, email, document } = await _User2.default.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/

    return res.json({
      id,
      handle,
      email,
      document,
    });
  }

  async show(req, res) {
    const { value } = req.query;

    let isAvailable;
    switch (req.path) {
      case '/users/handle':
        isAvailable = await _User2.default.findOne({ where: { handle: value } });
        break;
      case '/users/email':
        isAvailable = await _User2.default.findOne({ where: { email: value } });
        break;
      case '/users/document':
        isAvailable = await _User2.default.findOne({ where: { document: value } });
        break;
      default:
        break;
    }

    if (isAvailable) {
      return res.json({ isAvailable: false });
    }
    return res.json({ isAvailable: true });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await _User2.default.findByPk(req.userId);

    // Prevents duplicating e-mails
    if (email !== user.email) {
      const userExists = await _User2.default.findOne({ where: { email } });

      if (userExists)
        return res.status(400).json({ error: 'User already exists' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Password does not match' });

    await user.update(req.body);

    const { id, handle, avatar } = await _User2.default.findByPk(req.userId, {
      include: [
        {
          model: _File2.default,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      handle,
      email,
      avatar,
    });
  }
}

exports. default = new UserController();
