"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _Voucher = require('../models/Voucher'); var _Voucher2 = _interopRequireDefault(_Voucher);
var _Order = require('../models/Order'); var _Order2 = _interopRequireDefault(_Order);

// import CreationDeliveryMail from '../jobs/CreationDeliveryMail';

var _error = require('../../error'); var _error2 = _interopRequireDefault(_error);

var _Cache = require('../../lib/Cache'); var _Cache2 = _interopRequireDefault(_Cache);
var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

class CreateVoucherService {
  async run({ value, bonus, month, order_id, client_id, company_id }) {
    /*
     * Check if client exists
     */
    const clientExists = await _Client2.default.findByPk(client_id);

    if (!clientExists) {
      throw new (0, _error2.default)({
        status: 400,
        message: 'Client does not exists',
      });
    }

    /*
     * Check if company exists
     */
    const company = await _Company2.default.findByPk(company_id);

    if (!company) {
      throw new (0, _error2.default)({
        status: 400,
        message: 'Company does not exists',
      });
    }

    /*
     * Check if order exists
     */
    const order = await _Order2.default.findByPk(order_id);

    if (!order) {
      throw new (0, _error2.default)({
        status: 400,
        message: 'Order does not exists',
      });
    }

    const confirmation_code = Math.floor(100000 + Math.random() * 900000);

    const {
      id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    } = await _Voucher2.default.create({
      value,
      bonus,
      month,
      order_id,
      client_id,
      company_id,
      confirmation_code, // generates six digit code
      status: 'PENDENTE',
    });

    /**
     * Invalidate Cache
     */
    /*await Cache.invalidatePrefix(`deliveries`);*/

    /*await Queue.add(CreationDeliveryMail.key, {
      deliverer: company,
      recipient: clientExists,
      product,
    });*/

    return {
      id,
      value,
      bonus,
      month,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    };
  }
}

exports. default = new CreateVoucherService();
