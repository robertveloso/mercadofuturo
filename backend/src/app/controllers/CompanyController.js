import Company from '../models/Company';
import User from '../models/User';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class CompanyController {
  async index(req, res) {
    const response = await Company.findAll({
      attributes: ['id', 'name', 'description', 'site', 'address', 'phone'],
      order: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'handle', 'document', 'email', 'avatar_id'],
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
      attributes: ['id', 'name', 'description', 'site', 'address', 'phone'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'handle', 'document', 'email', 'avatar_id'],
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
    // const { id, name, email } = await User.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/
    console.log('logging: add company', req.body);
    const response = await Company.create(req.body);
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

export default new CompanyController();
