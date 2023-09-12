/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
const mercadopago = require('mercadopago');
const axios = require('axios');
require('dotenv').config();

const receiveWebhook = async (req, res) => {
  const { MP_URL } = process.env;
  try {
    // console.log('notification payment received:', req.query);
    // console.log(req.query);
    const { query } = req;
    const topic = query.topic || query.type;
    console.log(topic);

    switch (topic) {
      case 'payment':
        const paymentId = query['data.id'];
        // console.log('getting', topic, paymentId);
        const payment = await mercadopago.payment.findById(paymentId);
        // console.log(payment);
        const pay = {
          id: payment.body.additional_info.items[0].id,
          idMP: payment.body.id,
          amount: payment.body.transaction_amount,
          date: payment.body.date_approved,
          method: payment.body.payment_type_id,
          status: payment.body.status,
        };
        // console.log(pay);

        // Enviar el objeto JSON como parte del cuerpo de la solicitud POST
        const crearPagoUrl = `${MP_URL}/payments`; // Reemplaza con la URL correcta

        const response = await axios.post(crearPagoUrl, pay);
        // console.log('Respuesta de la creación de pago:', response.data);

        const merchantO = await mercadopago.merchant_orders.findById(
          payment.body.order.id,
        );
        // console.log(merchantO);
        break;
      case 'merchant_order':
        const orderId = query.id;
        // console.log('getting', topic, orderId);
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
