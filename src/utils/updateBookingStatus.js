/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
/* eslint-disable no-restricted-syntax */
const { Op } = require('sequelize');
const { Booking } = require('../db');

async function updateBookingStatus() {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const bookingsToUpdate = await Booking.findAll({
      where: {
        finishDate: {
          [Op.lt]: currentDate,
        },
        stateBooking: 'confirmed',
      },
    });

    // Actualiza el estado de las reservas encontradas a "completed"
    for (const booking of bookingsToUpdate) {
      booking.stateBooking = 'completed';
      await booking.save(); // Guarda la reserva actualizada en la base de datos
    }

    return bookingsToUpdate.length; // Devuelve la cantidad de reservas actualizadas
  } catch (error) {
    throw error;
  }
}

module.exports = updateBookingStatus;
