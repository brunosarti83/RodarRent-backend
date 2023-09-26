const express = require("express");
const { Booking } = require("../../db");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const getFutureBookingsHandler = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const futureBookings = await Booking.findAll({
      attributes: [
        [
          sequelize.fn("to_char", sequelize.col("startDate"), "YYYY-MM"),
          "month",
        ],
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where: {
        startDate: {
          [Op.gte]: `${currentYear}-${currentMonth
            .toString()
            .padStart(2, "0")}-01T00:00:00.000Z`,
        },
      },
      group: [sequelize.fn("to_char", sequelize.col("startDate"), "YYYY-MM")],
      order: [
        [sequelize.fn("to_char", sequelize.col("startDate"), "YYYY-MM"), "ASC"],
      ],
    });
    return futureBookings;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving Future Bookings." });
  }
};

module.exports = getFutureBookingsHandler;
