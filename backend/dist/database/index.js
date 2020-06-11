"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _mongo = require('../config/mongo'); var _mongo2 = _interopRequireDefault(_mongo);

// Importar models e colocar no array
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _Client = require('../app/models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _Company = require('../app/models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _Order = require('../app/models/Order'); var _Order2 = _interopRequireDefault(_Order);
var _Voucher = require('../app/models/Voucher'); var _Voucher2 = _interopRequireDefault(_Voucher);

const models = [_User2.default, _File2.default, _Client2.default, _Company2.default, _Order2.default, _Voucher2.default];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = _mongoose2.default.connect(
      `mongodb://${_mongo2.default.username}:${_mongo2.default.password}@${_mongo2.default.host}:${_mongo2.default.port}/${_mongo2.default.database}`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

exports. default = new Database();
