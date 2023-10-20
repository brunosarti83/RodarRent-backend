/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
const mercadopago = require('mercadopago');
const axios = require('axios');
require('dotenv').config();

const receiveWebhook = async (req, res) => {
  const { MP_URL } = process.env;
  try {
    // gets topic or type via query
    const { query } = req;
    const topic = query.topic || query.type;

    switch (topic) {
      case 'payment':
        // if payment look for payment id on query
        const paymentId = query['data.id'];
        // with query id ask mercadopago for payment data
        const payment = await mercadopago.payment.findById(paymentId);
        // with payment data format pay object to POST payment on to db
        const pay = {
          id: payment.body.additional_info.items[0].id, //bookings Id
          idMP: payment.body.id,
          amount: payment.body.transaction_amount,
          date: payment.body.date_approved,
          method: payment.body.payment_type_id,
          status: payment.body.status,
        };
        // url from our own payments routes
        const crearPagoUrl = `${MP_URL}/payments`;
        // post pay object to log payment on db
        const response = await axios.post(crearPagoUrl, pay);
        // look for utility of merchantO
        const merchantO = await mercadopago.merchant_orders.findById(
          payment.body.order.id,
        );
        // console.log(merchantO);
        break;

      case 'merchant_order':
        const orderId = query.id;
        const merchantOrder = await mercadopago.merchant_orders.findById(
          orderId,
        );
        // console.log(merchantOrder);
        break;
    }
    res.sendStatus(200);

  } catch (error) {
    console.error('error notification payment:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = receiveWebhook;
