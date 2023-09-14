const { Router } = require('express');
const createOrder = require('../controllers/mercadoPago');
const receiveWebhook = require('../controllers/receiveWebhook');
const { Booking, Pay } = require('../db');
require('dotenv').config();

const { CLIENT_URL } = process.env;

const router = Router();

router.get('/createorder', createOrder);
// si el pago se aprueba deberia enviarlo de vuelta a la pagina RodarRent
router.get('/success', async (req, res, next) => {
  const { query } = req;
  const idMP = parseInt(query.payment_id, 10);

  const pay = await Pay.findOne({
    where: {
      idMP,
    },
    include: [
      {
        model: Booking,
      },
    ],
  });

  if (pay && pay.Booking) {
    res.redirect(`${CLIENT_URL}/customer/${pay.Booking.dataValues.CustomerId}`);
  } else if (pay) {
    next(
      new Error(
        'Se encontró un registro Pay, pero no tiene una reserva asociada',
      ),
    );
  } else {
    next(new Error('No se encontró un registro con ese idMP'));
  }
});

router.get('/failure', (req, res) => res.send('Failure'));

router.get('/pending', (req, res) => res.send('Pending'));

router.post('/webhook', receiveWebhook);

module.exports = router;
