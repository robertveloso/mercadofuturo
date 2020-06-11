"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _Deliverer = require('../models/Deliverer'); var _Deliverer2 = _interopRequireDefault(_Deliverer);
var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class DeliveryFinishController {
  async update(req, res) {
    const { delivererId, deliveryId } = req.params;

    /*
     * Check if deliverer exists
     */
    const deliverer = await _Deliverer2.default.findByPk(delivererId);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    /*
     * Check if delivery exists
     */
    const delivery = await _Delivery2.default.findOne({
      where: {
        id: deliveryId,
        start_date: { [_sequelize.Op.not]: null },
        signature_id: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { signature_id } = req.body;

    const signatureImage = await _File2.default.findByPk(signature_id);

    if (!signatureImage) {
      return res.status(400).json({ error: 'Signature image does not exists' });
    }

    await delivery.update({
      end_date: new Date(),
      signature_id,
      status: 'ENTREGUE',
    });

    return res.json({});
  }
}

exports. default = new DeliveryFinishController();
