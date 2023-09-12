/* eslint-disable object-shorthand */
const mercadopago = require('mercadopago');
require('dotenv').config();
const { Booking } = require('../db');

const createOrder = async (req, res) => {
  const { ACCESS_TOKEN, MP_URL } = process.env;

  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
  // const { product } = req.body;
  const product = {
    id: '11f0845e-b82c-440b-bf37-55ffb587c821',
    title: 'rent Car test', // el nombre para el servicio del alquiler del auto
    quantity: 7,
    currency_id: 'ARS',
    unit_price: 200,
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
    res.send(`<a href=${payLink}>Ir a Pagar</a>`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createOrder;
