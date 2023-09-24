const express = require("express");
const { Booking } = require("../../db");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const getHistoryBookingsHandler = async (req, res) => {
  try {
    const history = await Booking.findAll({
      attributes: [
        [
          sequelize.fn("to_char", sequelize.col("startDate"), "YYYY-MM"),
          "month",
        ],
        [sequelize.fn("SUM", sequelize.col("amount")), "profit"],
      ],
      group: [sequelize.fn("to_char", sequelize.col("startDate"), "YYYY-MM")],
      order: [
        [sequelize.fn("to_char", sequelize.col("startDate"), "YYYY-MM"), "ASC"],
      ],
    });
    return history;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving profit history." });
  }
};

module.exports = getHistoryBookingsHandler;
