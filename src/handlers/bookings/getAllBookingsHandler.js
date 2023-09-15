const { Booking } = require("../../db");

const getAllBookingsHandler = async () => {
  const bookings = await Booking.findAll({
    where: {
      isActive: false,
    },
  });
  return bookings;
};

module.exports = {
  getAllBookingsHandler,
};
