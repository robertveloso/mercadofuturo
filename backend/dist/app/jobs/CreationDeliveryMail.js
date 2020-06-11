"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class CreationDeliveryMail {
  get key() {
    return 'CreationDeliveryMail';
  }

  async handle({ data }) {
    const { deliverer, product, recipient } = data;

    await _Mail2.default.sendMail({
      to: `${deliverer.name} <${deliverer.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'CreationDelivery',
      context: {
        deliverer: deliverer.name,
        product,
        recipient: recipient.name,
        city: recipient.city,
        state: recipient.state,
        street: recipient.street,
        number: recipient.number,
        zip_code: recipient.zip_code,
      },
    });
  }
}

exports. default = new CreationDeliveryMail();
