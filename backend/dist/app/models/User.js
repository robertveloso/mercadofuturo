"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        handle: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        document: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

exports. default = User;
