import bcrypt from 'bcryptjs';

import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  // Entregador
  static init(sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        document: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'clients',
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Client;
