"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Company extends _sequelize.Model {
  // Entregador
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        // document: Sequelize.STRING,
        // email: Sequelize.STRING,
        // slug: Sequelize.STRING,
        description: _sequelize2.default.STRING,
        address: _sequelize2.default.STRING,
        site: _sequelize2.default.STRING,
        phone: _sequelize2.default.STRING,
      },
      {
        sequelize,
        tableName: 'companies',
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

exports. default = Company;
