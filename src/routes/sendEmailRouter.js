const { Router } = require('express');
const sendEmail = require('../controllers/sendEmail');
const sendEmailValidation = require('../middlewares/sendEmailValidation');

const router = Router();

router.post('/sendemail', sendEmailValidation,sendEmail);

module.exports = router;