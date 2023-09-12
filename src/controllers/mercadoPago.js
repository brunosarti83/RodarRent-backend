/* eslint-disable object-shorthand */
const mercadopago = require('mercadopago');
require('dotenv').config();
const { Booking } = require('../db');

const createOrder = async (req, res) => {
  const { ACCESS_TOKEN, MP_URL } = process.env;

  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
  const { query } = req;
  const product = {
    id: query.id,
    title: query.title, // el nombre para el servicio del alquiler del auto
    quantity: parseInt(query.quantity),
    currency_id: query.currency_id,
    unit_price: parseFloat(query.unit_price),
  };

  const backUrls = {
    success: `${MP_URL}/success`,
    failure: `${MP_URL}/failure`,
    pending: `${MP_URL}/pending`,
  };
  const notificationUrl = `${MP_URL}/webhook`;

  const preference = {
    items: [
      {
        id: product.id, // es el id de la reserva
        title: product.title,
        quantity: product.quantity,
        currency_id: product.currency_id,
        unit_price: product.unit_price,
      },
    ],
    back_urls: backUrls,
    notification_url: notificationUrl,
  };

  try {
    const booking = await Booking.findOne({
      where: { id: product.id, PayId: null },
    }); // cambiar id por valor dinámico

    if (!booking) {
      throw Error(
        'It is not possible to create the payment for this reservation. The reservation already has an associated payment',
      );
    }
    const response = await mercadopago.preferences.create(preference);
    // console.log(response.body.items);
    const payLink = response.body.init_point;
    res.send(payLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createOrder;
