import bcrypt from 'bcryptjs';

import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  // Entregador
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        slug: Sequelize.STRING,
        description: Sequelize.STRING,
        address: Sequelize.STRING,
        address_map: Sequelize.STRING,
        site: Sequelize.STRING,
        phone: Sequelize.STRING,
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

export default Company;
