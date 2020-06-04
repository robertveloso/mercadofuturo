import Client from '../models/Client';
import Company from '../models/Company';
import Voucher from '../models/Voucher';
import Order from '../models/Order';

// import CreationDeliveryMail from '../jobs/CreationDeliveryMail';

import Error from '../../error';

import Cache from '../../lib/Cache';
import Queue from '../../lib/Queue';

class CreateVoucherService {
  async run({ value, bonus, month, order_id, client_id, company_id }) {
    /*
     * Check if client exists
     */
    const clientExists = await Client.findByPk(client_id);

    if (!clientExists) {
      throw new Error({
        status: 400,
        message: 'Client does not exists',
      });
    }

    /*
     * Check if company exists
     */
    const company = await Company.findByPk(company_id);

    if (!company) {
      throw new Error({
        status: 400,
        message: 'Company does not exists',
      });
    }

    /*
     * Check if order exists
     */
    const order = await Order.findByPk(order_id);

    if (!order) {
      throw new Error({
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
    } = await Voucher.create({
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

export default new CreateVoucherService();
