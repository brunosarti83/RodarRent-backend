const { Router } = require('express');
const createOrder = require('../controllers/mercadoPago');
const receiveWebhook = require('../controllers/receiveWebhook');

const router = Router();

router.get('/createorder', createOrder);
// si el pago se aprueba deberia enviarlo de vuelta a la pagina RodarRent
router.get('/success', (req, res) => res.send('Success Order'));

router.get('/failure', (req, res) => res.send('Failure'));

router.get('/pending', (req, res) => res.send('Pending'));

router.post('/webhook', receiveWebhook);

module.exports = router;
