import Company from '../models/Company';
import User from '../models/User';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class CompanyController {
  async index(req, res) {
    const response = await Company.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'description',
        'slug',
        'site',
        'address',
        'address_map',
        'phone',
      ],
      order: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'avatar_id'],
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
    const { id: companyId } = req.params;

    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(400).json({ error: 'Company does not exists' });
    }

    const response = await Company.findAll({
      where: {
        id: companyId,
      },
      order: ['id'],
      attributes: [
        'id',
        'name',
        'email',
        'description',
        'slug',
        'site',
        'address',
        'address_map',
        'phone',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'avatar_id'],
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
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    const { id, name, email } = await User.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/

    return res.json({
      id,
      name,
      email,
    });
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

    const { id, name, avatar } = await User.findByPk(req.userId, {
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
      name,
      email,
      avatar,
    });
  }
}

export default new CompanyController();
