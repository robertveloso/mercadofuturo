import User from '../models/User';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class UserController {
  async store(req, res) {
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    const handleExists = await User.findOne({
      where: { handle: req.body.handle },
    });
    const documentExists = await User.findOne({
      where: { document: req.body.document },
    });

    if (emailExists)
      return res.status(400).json({ error: 'user/email-already-exists' });
    if (handleExists)
      return res.status(400).json({ error: 'user/handle-already-exists' });
    if (documentExists)
      return res.status(400).json({ error: 'user/document-already-exists' });

    const { id, handle, email, document } = await User.create(req.body);

    /*if (provider) {
      await Cache.invalidate('providers');
    }*/

    return res.json({
      id,
      handle,
      email,
      document,
    });
  }

  async show(req, res) {
    const { value } = req.query;

    let isAvailable;
    switch (req.path) {
      case '/users/handle':
        isAvailable = await User.findOne({ where: { handle: value } });
        break;
      case '/users/email':
        isAvailable = await User.findOne({ where: { email: value } });
        break;
      case '/users/document':
        isAvailable = await User.findOne({ where: { document: value } });
        break;
      default:
        break;
    }

    if (isAvailable) {
      return res.json({ isAvailable: false });
    }
    return res.json({ isAvailable: true });
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

export default new UserController();
