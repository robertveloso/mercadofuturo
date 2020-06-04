import Sequelize, { Model } from 'sequelize';

class Voucher extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.FLOAT,
        bonus: Sequelize.FLOAT,
        month: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: Sequelize.STRING,
        confirmation_code: Sequelize.STRING,
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

export default Voucher;
