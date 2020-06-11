"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);

var _DeliveryProblem = require('../schemas/DeliveryProblem'); var _DeliveryProblem2 = _interopRequireDefault(_DeliveryProblem);
var _CancelDeliveryService = require('../services/CancelDeliveryService'); var _CancelDeliveryService2 = _interopRequireDefault(_CancelDeliveryService);

var _Cache = require('../../lib/Cache'); var _Cache2 = _interopRequireDefault(_Cache);

class DeliveryProblemController {
  async store(req, res) {
    const { id } = req.params;

    const delivery = await _Delivery2.default.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    if (!delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'This delivery has not been withdrawn' });
    }

    if (delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: 'This deliery already be canceled' });
    }

    const { description } = req.body;

    const deliveryProblem = await _DeliveryProblem2.default.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const perPage = 5;

    const cacheKey = `deliveryProblems:${page}`;

    const cached = await _Cache2.default.get(cacheKey);

    if (cached) return res.json(cached);

    const deliveryProblems = await _DeliveryProblem2.default.find()
      .skip((page - 1) * 5)
      .limit(perPage);

    await _Cache2.default.set(cacheKey, deliveryProblems);

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await _Delivery2.default.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryProblems = await _DeliveryProblem2.default.find({ delivery_id: id });

    return res.json(deliveryProblems);
  }

  async destroy(req, res) {
    // Request for cancel delivery and send mail
    const delivery = await _CancelDeliveryService2.default.run({
      id: req.params.id,
    });

    return res.json(delivery);
  }
}

exports. default = new DeliveryProblemController();
