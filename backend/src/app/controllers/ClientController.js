import Client from '../models/Client';
import User from '../models/User';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class ClientController {
  async index(req, res) {
    const response = await Client.findAll({
      attributes: ['id', 'firstName', 'lastName', 'phone'],
      order: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'handle', 'email', 'document', 'avatar_id'],
          include: [
            {
              model: File,
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

    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const response = await Client.findAll({
      where: {
        id: clientId,
      },
      order: ['id'],
      attributes: ['id', 'firstName', 'lastName', 'phone'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'handle', 'email', 'document', 'avatar_id'],
          include: [
            {
              model: File,
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

    const response = await Client.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/

    return res.json(response);
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Prevents duplicating e-mails
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return res.status(400).json({ error: 'User already exists' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Password does not match' });

    await user.update(req.body);

    const { id, handle, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
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

export default new ClientController();
