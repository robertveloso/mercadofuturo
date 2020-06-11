"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Voucher extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        value: _sequelize2.default.FLOAT,
        bonus: _sequelize2.default.FLOAT,
        month: _sequelize2.default.STRING,
        canceled_at: _sequelize2.default.DATE,
        start_date: _sequelize2.default.DATE,
        end_date: _sequelize2.default.DATE,
        status: _sequelize2.default.STRING,
        confirmation_code: _sequelize2.default.STRING,
      },
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

exports. default = Voucher;
