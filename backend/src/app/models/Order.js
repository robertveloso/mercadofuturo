import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  // Destinatário
  static init(sequelize) {
    super.init(
      {
        reference: {
          type: Sequelize.UUIDV4,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
          allowNull: false,
          autoIncrement: false,
        },
        value: Sequelize.FLOAT,
        status: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
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

export default Order;
