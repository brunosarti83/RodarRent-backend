const getFutureBookingsHandler = require("../../handlers/bookings/getFutureBookingsHandler");

const getFutureBookings = async (req, res) => {
  try {
    const futureBookings = await getFutureBookingsHandler();

    res.status(200).json(futureBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFutureBookings;
