const getHistoryBookingsHandler = require("../../handlers/bookings/getHistoryBookingsHandler");

const getHistoryBookings = async (req, res) => {
  try {
    const historyBookings = await getHistoryBookingsHandler();

    res.status(200).json(historyBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getHistoryBookings;
