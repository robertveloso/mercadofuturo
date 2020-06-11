"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

// import Cache from '../../lib/Cache';

class CompanyController {
  async index(req, res) {
    const response = await _Company2.default.findAll({
      attributes: ['id', 'name', 'description', 'site', 'address', 'phone'],
      order: ['id'],
      include: [
        {
          model: _User2.default,
          as: 'user',
          attributes: ['id', 'handle', 'document', 'email', 'avatar_id'],
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
    const { id: companyId } = req.params;

    const company = await _Company2.default.findByPk(companyId);

    if (!company) {
      return res.status(400).json({ error: 'Company does not exists' });
    }

    const response = await _Company2.default.findAll({
      where: {
        id: companyId,
      },
      order: ['id'],
      attributes: ['id', 'name', 'description', 'site', 'address', 'phone'],
      include: [
        {
          model: _User2.default,
          as: 'user',
          attributes: ['id', 'handle', 'document', 'email', 'avatar_id'],
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
    // const { id, name, email } = await User.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/
    console.log('logging: add company', req.body);
    const response = await _Company2.default.create(req.body);
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

exports. default = new CompanyController();
