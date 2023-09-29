const { Booking } = require("../../db");

const getAllBookingsHandler = async () => {
  const bookings = await Booking.findAll({
    where: {
      isActive: true,
    },
  });
  return bookings;
};

module.exports = {
  getAllBookingsHandler,
};
