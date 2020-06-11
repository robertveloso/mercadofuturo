"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _datefns = require('date-fns');

var _Deliverer = require('../models/Deliverer'); var _Deliverer2 = _interopRequireDefault(_Deliverer);
var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);

class DeliveryWithDrawController {
  async update(req, res) {
    const { delivererId, deliveryId } = req.params;

    /*
     * Check if deliverer exists
     */
    const deliverer = await _Deliverer2.default.findByPk(delivererId);

    if (!deliverer) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    /*
     * Check if delivery exists
     */
    const delivery = await _Delivery2.default.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { count } = await _Delivery2.default.findAndCountAll({
      where: {
        deliverer_id: delivererId,
        start_date: null,
        signature_id: null,
      },
    });

    if (count === 5) {
      return res
        .status(400)
        .json({ error: 'Maximum number of withdrawals reached' });
    }

    const { start_date } = req.body;
    const start_date_ISO = _datefns.parseISO.call(void 0, start_date);

    if (
      _datefns.isBefore.call(void 0, start_date_ISO, _datefns.setHours.call(void 0, new Date(), 8)) ||
      _datefns.isAfter.call(void 0, start_date_ISO, _datefns.setHours.call(void 0, new Date(), 18))
    ) {
      return res.status(400).json({ error: 'Invalid time' });
    }

    await delivery.update({ start_date, status: 'RETIRADA' });

    return res.json({});
  }
}

exports. default = new DeliveryWithDrawController();
