const express = require('express');
const { Booking } = require('../../db');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const getFutureBookingsHandler = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth() + 1;

    const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

    const futureBookings = await Booking.findAll({
      attributes: [
        [
          sequelize.fn('to_char', sequelize.col('startDate'), 'YYYY-MM'),
          'month',
        ],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      where: {
        startDate: {
          [Op.gte]: `${nextMonthYear}-${nextMonth
            .toString()
            .padStart(2, '0')}-01T00:00:00.000Z`,
        },
        stateBooking: {
          [Op.or]: ['confirmed', 'pending'], // Filtrar por estados "confirmed" o "pending"
        },
      },
      group: [sequelize.fn('to_char', sequelize.col('startDate'), 'YYYY-MM')],
      order: [
        [sequelize.fn('to_char', sequelize.col('startDate'), 'YYYY-MM'), 'ASC'],
      ],
      limit: 7, // Limitar a los próximos 7 meses
    });

    return futureBookings;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving Future Bookings.' });
  }
};

module.exports = getFutureBookingsHandler;
