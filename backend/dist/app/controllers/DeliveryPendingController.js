"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Deliverer = require('../models/Deliverer'); var _Deliverer2 = _interopRequireDefault(_Deliverer);
var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);
var _Recipient = require('../models/Recipient'); var _Recipient2 = _interopRequireDefault(_Recipient);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class DeliveryPendingController {
  async index(req, res) {
    const { id: delivererId } = req.params;

    const deliverer = await _Deliverer2.default.findByPk(delivererId);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    const deliveries = await _Delivery2.default.findAll({
      where: {
        deliverer_id: delivererId,
        signature_id: null,
        canceled_at: null,
      },
      order: ['id'],
      attributes: [
        'id',
        'deliverer_id',
        'product',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: _Recipient2.default,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'state',
            'city',
            'street',
            'number',
            'complement',
            'zip_code',
          ],
        },
        {
          model: _File2.default,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

exports. default = new DeliveryPendingController();
