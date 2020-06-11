"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Order extends _sequelize.Model {
  // Destinatário
  static init(sequelize) {
    super.init(
      {
        reference: {
          type: _sequelize2.default.UUIDV4,
          defaultValue: _sequelize2.default.UUIDV4,
          unique: true,
          allowNull: false,
          autoIncrement: false,
        },
        value: _sequelize2.default.FLOAT,
        payment_url: _sequelize2.default.STRING,
        status: _sequelize2.default.STRING,
        canceled_at: _sequelize2.default.DATE,
      },
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

exports. default = Order;
