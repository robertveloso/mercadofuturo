import { Op } from 'sequelize';

import Voucher from '../models/Voucher';
import Order from '../models/Order';
import Company from '../models/Company';
import Client from '../models/Client';
import File from '../models/File';
import User from '../models/User';

import CreateVoucherService from '../services/CreateVoucherService';

import Cache from '../../lib/Cache';

class VoucherController {
  async store(req, res) {
    const { value, bonus, month, order_id, user_id, company_id } = req.body;

    const client = await Client.findOne({ where: { user_id } });
    const order = await Order.findByPk(order_id);
    const company = await Company.findByPk(company_id);

    await CreateVoucherService.run({
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

    const voucher = await Voucher.findByPk(id, {
      attributes: ['id', 'value', 'confirmation_code'],
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'firstName'],
        },
        {
          model: Company,
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

    const client = await Client.findOne({ where: { user_id: req.userId } });

    const response = await Voucher.findAll({
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
          model: Company,
          as: 'company',
          paranoid: false,
          attributes: ['id', 'name'],
          include: [
            {
              model: User,
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
    const voucher = await Voucher.findByPk(id);

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
    const voucher = await Voucher.findByPk(id);

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

export default new VoucherController();
