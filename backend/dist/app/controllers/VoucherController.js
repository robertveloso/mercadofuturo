"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _Voucher = require('../models/Voucher'); var _Voucher2 = _interopRequireDefault(_Voucher);
var _Order = require('../models/Order'); var _Order2 = _interopRequireDefault(_Order);
var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _CreateVoucherService = require('../services/CreateVoucherService'); var _CreateVoucherService2 = _interopRequireDefault(_CreateVoucherService);

var _Cache = require('../../lib/Cache'); var _Cache2 = _interopRequireDefault(_Cache);

class VoucherController {
  async store(req, res) {
    const { value, bonus, month, order_id, user_id, company_id } = req.body;

    const client = await _Client2.default.findOne({ where: { user_id } });
    const order = await _Order2.default.findByPk(order_id);
    const company = await _Company2.default.findByPk(company_id);

    await _CreateVoucherService2.default.run({
      value,
      bonus,
      month,
      order_id,
      client_id: client.id,
      company_id,
    });

    return res.json({ value, order, client, company });
  }

  async show(req, res) {
    const { id } = req.params;

    const voucher = await _Voucher2.default.findByPk(id, {
      attributes: ['id', 'value', 'confirmation_code'],
      include: [
        {
          model: _Client2.default,
          as: 'client',
          attributes: ['id', 'firstName'],
        },
        {
          model: _Company2.default,
          as: 'company',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!voucher) {
      return res.status(400).json({ error: 'Voucher does not exists' });
    }

    return res.json(voucher);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const cacheKey = `vouchers`;

    // const cached = await Cache.get(cacheKey);

    // if (cached) return res.json(cached);

    const client = await _Client2.default.findOne({ where: { user_id: req.userId } });

    const response = await _Voucher2.default.findAll({
      where: { client_id: client.id },
      attributes: [
        'id',
        'value',
        'bonus',
        'month',
        'status',
        'confirmation_code',
        'start_date',
        'end_date',
        'canceled_at',
        'company_id',
      ],
      order: ['id'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: _Company2.default,
          as: 'company',
          paranoid: false,
          attributes: ['id', 'name'],
          include: [
            {
              model: _User2.default,
              as: 'user',
              attributes: ['id', 'handle'],
            },
          ],
        },
      ],
    });

    /*console.log(12, response.company);

    const user = await User.findOne({
      where: { id: response.company.id },
      attributes: ['id', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });*/

    // await Cache.set(cacheKey, response);

    return res.json(response);
    // return res.json({ response, user });
  }

  async update(req, res) {
    const { id } = req.params;

    /*
     * Check if delivery exists
     */
    const voucher = await _Voucher2.default.findByPk(id);

    if (!voucher) {
      return res.status(400).json({ error: 'Voucher does not exists' });
    }

    const { reference, value, client_id, company_id } = req.body;

    await delivery.update({ reference, value, client_id, company_id });

    return res.json({});
  }

  async destroy(req, res) {
    const { id } = req.params;

    /*
     * Check if delivery exists
     */
    const voucher = await _Voucher2.default.findByPk(id);

    if (!voucher) {
      return res.status(400).json({ error: 'Voucher does not exists' });
    }

    /*
     * Checks if delivery was got
     */
    if (voucher.start_date) {
      return res.status(400).json({ error: 'This Delivery already been sent' });
    }

    await voucher.destroy();

    return res.json({});
  }
}

exports. default = new VoucherController();
