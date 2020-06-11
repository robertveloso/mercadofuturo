"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

// import Cache from '../../lib/Cache';

class ClientController {
  async index(req, res) {
    const response = await _Client2.default.findAll({
      attributes: ['id', 'firstName', 'lastName', 'phone'],
      order: ['id'],
      include: [
        {
          model: _User2.default,
          as: 'user',
          attributes: ['id', 'handle', 'email', 'document', 'avatar_id'],
          include: [
            {
              model: _File2.default,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });

    return res.json(response);
  }

  async show(req, res) {
    const { id: clientId } = req.params;

    const client = await _Client2.default.findByPk(clientId);

    if (!client) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const response = await _Client2.default.findAll({
      where: {
        id: clientId,
      },
      order: ['id'],
      attributes: ['id', 'firstName', 'lastName', 'phone'],
      include: [
        {
          model: _User2.default,
          as: 'user',
          attributes: ['id', 'handle', 'email', 'document', 'avatar_id'],
          include: [
            {
              model: _File2.default,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });

    return res.json(response[0]);
  }
  async store(req, res) {
    // const { user_id, first_name, last_name, phone } = req.body;
    console.log('logging: add client', req.body);
    /*const clientExists = await Client.findOne({
      where: { document },
    });

    if (clientExists)
      return res.status(400).json({ error: 'Client already exists' });*/

    const response = await _Client2.default.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/

    return res.json(response);
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

exports. default = new ClientController();
