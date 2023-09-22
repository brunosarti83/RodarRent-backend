const {
  cancelBookingHandler,
} = require("../../handlers/bookings/cancelBookingHandler");

const cancelBooking = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const booking = await cancelBookingHandler(data, id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = cancelBooking;
