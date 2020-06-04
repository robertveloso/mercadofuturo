import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';
import mongoConfig from '../config/mongo';

// Importar models e colocar no array
import User from '../app/models/User';
import File from '../app/models/File';
import Client from '../app/models/Client';
import Company from '../app/models/Company';
import Order from '../app/models/Order';
import Voucher from '../app/models/Voucher';

const models = [User, File, Client, Company, Order, Voucher];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
