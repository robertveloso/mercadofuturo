import { Op } from 'sequelize';
import Order from '../models/Order';
import User from '../models/User';
import Client from '../models/Client';

class OrderController {
  async store(req, res) {
    const { value, user_id } = req.body;

    const user = await User.findByPk(user_id);
    const client = await Client.findOne({ where: { user_id } });

    const { id, reference } = await Order.create({
      value,
      client_id: client.id,
      status: 'PENDENTE',
    });

    return res.json({
      id,
      reference,
      value,
      client,
      user,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const { payment_url } = req.body;
    console.log('peter', payment_url);
    await order.update({
      payment_url,
    });

    return res.json({});
  }

  async index(req, res) {
    const { q: recipientName, page = 1 } = req.query;

    const response = recipientName
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `${recipientName}%`,
            },
          },
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        })
      : await Recipient.findAll({
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
          limit: 5,
          offset: (page - 1) * 5,
        });

    return res.json(response);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    return res.json(recipient);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const deliveries = await Client.findOne({
      where: {
        recipient_id: recipient.id,
        signature_id: null,
      },
    });

    if (deliveries) {
      return res
        .status(400)
        .json({ error: 'This Recipient still has an delivery to receive' });
    }

    await recipient.destroy();
    return res.json({});
  }
}

export default new OrderController();
