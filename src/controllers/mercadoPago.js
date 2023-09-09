/* eslint-disable object-shorthand */
const mercadopago = require('mercadopago');
require('dotenv').config();
const { Booking } = require('../db');

const createOrder = async (req, res) => {
  const { ACCESS_TOKEN } = process.env;

  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
  // const { product } = req.body;

  const backUrls = {
    success: 'http://localhost:3001/success',
    failure: 'http://localhost:3001/failure',
    pending: 'http://localhost:3001/pending',
  };
  const notificationUrl =
    'https://5dab-2800-e2-a200-192-a050-3edf-9f4b-c874.ngrok-free.app/webhook';

  const preference = {
    items: [
      {
        id: '95765850-8b11-4098-a021-e9633f9c6106', // es el id de la reserva
        title: 'rent Car test', // el nombre para el servicio del alquiler del auto
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 1500,
      },
    ],
    back_urls: backUrls,
    notification_url: notificationUrl,
  };

  try {
    const booking = await Booking.findOne({
      where: { id: '95765850-8b11-4098-a021-e9633f9c6106', PayId: null },
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
