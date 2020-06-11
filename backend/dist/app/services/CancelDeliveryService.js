"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Recipient = require('../models/Recipient'); var _Recipient2 = _interopRequireDefault(_Recipient);
var _Deliverer = require('../models/Deliverer'); var _Deliverer2 = _interopRequireDefault(_Deliverer);
var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);

var _CancellationDeliveryMail = require('../jobs/CancellationDeliveryMail'); var _CancellationDeliveryMail2 = _interopRequireDefault(_CancellationDeliveryMail);

var _error = require('../../error'); var _error2 = _interopRequireDefault(_error);

var _Cache = require('../../lib/Cache'); var _Cache2 = _interopRequireDefault(_Cache);
var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

class CancelDeliveryService {
  async run({ id }) {
    const { delivery_id, description } = await DeliveryProblem.findById(id);

    const delivery = await _Delivery2.default.findByPk(delivery_id, {
      include: [
        {
          model: _Deliverer2.default,
          as: 'deliverer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: _Recipient2.default,
          as: 'recipient',
        },
      ],
    });

    if (delivery.canceled_at)
      throw new (0, _error2.default)({
        status: 401,
        message: 'Already canceled.',
      });

    await delivery.update({ canceled_at: new Date(), status: 'CANCELADA' });
    await DeliveryProblem.findByIdAndDelete(id);

    /**
     * Invalidate Cache
     */
    await _Cache2.default.invalidatePrefix(`deliveryProblems`);

    await _Queue2.default.add(_CancellationDeliveryMail2.default.key, {
      deliverer: delivery.deliverer,
      description,
      recipient: delivery.recipient,
      product: delivery.product,
    });

    return res.json({});
  }
}

exports. default = new CancelDeliveryService();
