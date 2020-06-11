"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _expressbrute = require('express-brute'); var _expressbrute2 = _interopRequireDefault(_expressbrute);
var _expressbruteredis = require('express-brute-redis'); var _expressbruteredis2 = _interopRequireDefault(_expressbruteredis);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _redis = require('./config/redis'); var _redis2 = _interopRequireDefault(_redis);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _CompanyController = require('./app/controllers/CompanyController'); var _CompanyController2 = _interopRequireDefault(_CompanyController);
var _OrderController = require('./app/controllers/OrderController'); var _OrderController2 = _interopRequireDefault(_OrderController);
var _VoucherController = require('./app/controllers/VoucherController'); var _VoucherController2 = _interopRequireDefault(_VoucherController);
var _ClientController = require('./app/controllers/ClientController'); var _ClientController2 = _interopRequireDefault(_ClientController);
//import RecipientController from './app/controllers/RecipientController';
// import DelivererController from './app/controllers/DelivererController';
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
// import DeliveryController from './app/controllers/DeliveryController';
// import DeliveryPendingController from './app/controllers/DeliveryPendingController';
// import DeliveryDeliveredController from './app/controllers/DeliveryDeliveredController';
// import DeliveryWithDrawController from './app/controllers/DeliveryWithDrawController';
// import DeliveryFinishController from './app/controllers/DeliveryFinishController';
// import DeliveryProblemController from './app/controllers/DeliveryProblemController';

var _UserStore = require('./app/validators/UserStore'); var _UserStore2 = _interopRequireDefault(_UserStore);
var _UserUpdate = require('./app/validators/UserUpdate'); var _UserUpdate2 = _interopRequireDefault(_UserUpdate);
var _SessionStore = require('./app/validators/SessionStore'); var _SessionStore2 = _interopRequireDefault(_SessionStore);
var _RecipientStoreOrUpdate = require('./app/validators/RecipientStoreOrUpdate'); var _RecipientStoreOrUpdate2 = _interopRequireDefault(_RecipientStoreOrUpdate);
// import validateDelivererStoreOrUpdate from './app/validators/DelivererStoreOrUpdate';
// import validateDeliveryWithDraw from './app/validators/DeliveryWithDraw';
// import validateDeliveryStoreOrUpdate from './app/validators/DeliveryStoreOrUpdate';
// import validateDeliveryProblemStore from './app/validators/DeliveryProblemStore';

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

const bruteStore = new (0, _expressbruteredis2.default)({
  host: _redis2.default.host,
  port: _redis2.default.port,
});

const bruteForce = new (0, _expressbrute2.default)(bruteStore);

routes.post('/users', _UserStore2.default, _UserController2.default.store);

routes.post(
  '/sessions',
  // bruteForce.prevent,
  _SessionStore2.default,
  _SessionController2.default.store
);

// routes.get('/deliverer/:id', DeliveryPendingController.index);
// routes.get('/deliverer/:id/deliveries', DeliveryDeliveredController.index);
// routes.put(
//   '/deliverer/:delivererId/delivery/:deliveryId',
//   validateDeliveryWithDraw,
//   DeliveryWithDrawController.update
// );
// routes.put(
//   '/deliverer/:delivererId/delivery/:deliveryId/finish',
//   DeliveryFinishController.update
// );

// routes.post(
//   '/delivery/:id/problems',
//   validateDeliveryProblemStore,
//   DeliveryProblemController.store
// );

// routes.get('/deliverers/:id', DelivererController.show);

routes.post('/files', upload.single('file'), _FileController2.default.store); // Upload de arquivos

routes.post('/clients', _ClientController2.default.store);

routes.post('/companies', _CompanyController2.default.store);
routes.get('/companies', _CompanyController2.default.index);
routes.get('/companies/:id', _CompanyController2.default.show);

routes.get('/users/handle', _UserController2.default.show);
routes.get('/users/email', _UserController2.default.show);
routes.get('/users/document', _UserController2.default.show);

routes.use(_auth2.default); // todas as rotas declaradas abaixo, deverão conter o token.

routes.put('/users', _UserUpdate2.default, _UserController2.default.update);

routes.post('/orders', _OrderController2.default.store);
routes.put('/orders/:id', _OrderController2.default.update);

routes.post('/vouchers', _VoucherController2.default.store);
routes.get('/vouchers', _VoucherController2.default.index);

// Rotas de destinatarios
/*routes.post(
  '/recipients',
  validateRecipientStoreOrUpdate,
  RecipientController.store
);
routes.put(
  '/recipients/:id',
  validateRecipientStoreOrUpdate,
  RecipientController.update
);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients/:id', RecipientController.destroy);*/

// // Rotas de entregadores
// routes.post(
//   '/deliverers',
//   validateDelivererStoreOrUpdate,
//   DelivererController.store
// );
// routes.get('/deliverers', DelivererController.index);
// routes.put(
//   '/deliverers/:id',
//   validateDelivererStoreOrUpdate,
//   DelivererController.update
// );
// routes.delete('/deliverers/:id', DelivererController.destroy);

// routes.get('/deliveries/problems', DeliveryProblemController.index);
// routes.get('/delivery/:id/problems', DeliveryProblemController.show);

// // Rotas de encomendas
// routes.post(
//   '/deliveries',
//   validateDeliveryStoreOrUpdate,
//   DeliveryController.store
// );
// routes.get('/deliveries', DeliveryController.index);
// routes.get('/deliveries/:id', DeliveryController.show);
// routes.put(
//   '/deliveries/:id',
//   validateDeliveryStoreOrUpdate,
//   DeliveryController.update
// );
// routes.delete('/deliveries/:id', DeliveryController.destroy);

// routes.delete(
//   '/problem/:id/cancel-delivery',
//   DeliveryProblemController.destroy
// );

exports. default = routes;
