"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _Companies = require('../models/Companies'); var _Companies2 = _interopRequireDefault(_Companies);
var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class DelivererController {
  async store(req, res) {
    const { name, email, avatar_id } = req.body;

    const delivererExists = await _Companies2.default.findOne({ where: { email } });

    /*
     * Check if deliverer already exists in database
     */
    if (delivererExists) {
      return res.status(400).json({ error: 'Deliverer already exists' });
    }

    const { id } = await _Companies2.default.create({ name, email, avatar_id });

    return res.json({ id, name, email, avatar_id });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliverer = await _Companies2.default.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: _File2.default,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    return res.json(deliverer);
  }

  async index(req, res) {
    const { q: delivererName, page = 1 } = req.query;

    const response = delivererName
      ? await _Companies2.default.findAll({
          where: {
            name: {
              [_sequelize.Op.iLike]: `${delivererName}%`,
            },
          },
          order: ['id'],
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: _File2.default,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        })
      : await _Companies2.default.findAll({
          attributes: ['id', 'name', 'email'],
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
          include: [
            {
              model: _File2.default,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        });

    return res.json(response);
  }

  async update(req, res) {
    const { name, email, avatar_id } = req.body;

    /*
     * Check if avatar_id exists in database
     */
    if (avatar_id) {
      const avatarExists = await _File2.default.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: 'File does not exists' });
      }
    }

    /*
     * Check if deliverer exists in database
     */
    const { id } = req.params;

    const deliverer = await _Companies2.default.findByPk(id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    /*
     * Check if exists an other deliverer with the same email
     */
    if (email !== deliverer.email) {
      const delivererExists = await _Companies2.default.findOne({ where: { email } });

      if (delivererExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await deliverer.update({ name, email, avatar_id });

    const { avatar } = await _Companies2.default.findByPk(id, {
      include: [
        {
          model: _File2.default,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliverer = await _Companies2.default.findByPk(id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    const delivery = await _Delivery2.default.findOne({
      where: { deliverer_id: id, end_date: null },
    });

    if (delivery) {
      return res.status(400).json({ error: "This Deliverer can't be deleted" });
    }

    await deliverer.destroy();

    return res.json({});
  }
}

exports. default = new DelivererController();
