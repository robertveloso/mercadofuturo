import { Op } from 'sequelize';

import Deliverer from '../models/Companies';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DelivererController {
  async store(req, res) {
    const { name, email, avatar_id } = req.body;

    const delivererExists = await Deliverer.findOne({ where: { email } });

    /*
     * Check if deliverer already exists in database
     */
    if (delivererExists) {
      return res.status(400).json({ error: 'Deliverer already exists' });
    }

    const { id } = await Deliverer.create({ name, email, avatar_id });

    return res.json({ id, name, email, avatar_id });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
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
      ? await Deliverer.findAll({
          where: {
            name: {
              [Op.iLike]: `${delivererName}%`,
            },
          },
          order: ['id'],
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        })
      : await Deliverer.findAll({
          attributes: ['id', 'name', 'email'],
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
          include: [
            {
              model: File,
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
      const avatarExists = await File.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: 'File does not exists' });
      }
    }

    /*
     * Check if deliverer exists in database
     */
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    /*
     * Check if exists an other deliverer with the same email
     */
    if (email !== deliverer.email) {
      const delivererExists = await Deliverer.findOne({ where: { email } });

      if (delivererExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await deliverer.update({ name, email, avatar_id });

    const { avatar } = await Deliverer.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    const delivery = await Delivery.findOne({
      where: { deliverer_id: id, end_date: null },
    });

    if (delivery) {
      return res.status(400).json({ error: "This Deliverer can't be deleted" });
    }

    await deliverer.destroy();

    return res.json({});
  }
}

export default new DelivererController();
