/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
const axios = require('axios');
const { Op } = require('sequelize');
const { Booking, Customer, Review } = require('../db');
require('dotenv').config();

const { CLIENT_URL, BACKEND_URL } = process.env;

const sendEmailsToCustomers = async () => {
  try {
    // Obtén todas las reservas completadas que tienen más de un día
    const bookings = await Booking.findAll({
      where: {
        stateBooking: 'completed',
        finishDate: { [Op.lt]: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
      include: [
        {
          model: Customer,
          include: [{ model: Review }],
        },
      ],
    });
    // console.log(bookings);
    // Para cada reserva, verifica si el cliente ya tiene una revisión asociada
    for (let booking of bookings) {
      const { Customer } = booking;
      //   console.log(Customer);

      // Si el cliente ya tiene una revisión asociada, continúa con la próxima reserva
      if (
        Customer.dataValues.Reviews &&
        Customer.dataValues.Reviews.length > 0
      ) {
        continue;
      }

      const data = {
        toEmailAddress: Customer.dataValues.email,
        subject: 'Leave your review',
        template: 'review',
        replyToEmailAddress: 'rodarrentadm@outlook.com',
        userName: Customer.dataValues.name,
        linkToReview: `${CLIENT_URL}/review`,
      };
      console.log(data);
      await axios.post(`${BACKEND_URL}/sendemail`, data);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmailsToCustomers;
