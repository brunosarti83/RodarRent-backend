const { Booking } = require("../../db");
const sequelize = require("sequelize");

const getBookingsSummaryHandler = async (data, res) => {
  try {
    const bookingSummary = await Booking.findAll({
      attributes: [
        "stateBooking",
        [sequelize.fn("count", sequelize.col("stateBooking")), "count"],
      ],
      group: ["stateBooking"],
      raw: true,
    });
    console.log(bookingSummary);

    res.json(bookingSummary);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while retrieving the bookings summary" });
  }
};

module.exports = { getBookingsSummaryHandler };
