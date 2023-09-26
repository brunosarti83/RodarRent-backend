const {
  getBookingsSummaryHandler,
} = require("../../handlers/bookings/getBookingsSummaryHandler");

const getBookingsSummary = async (req, res) => {
  const data = req.query;
  console.log(data);
  //const customerId = req.query.CustomerId (tenemos que poder traer solo las reservas del cliente que esta logueado)
  try {
    const summaryBookings = await getBookingsSummaryHandler(data, res);

    res.status(200).json(summaryBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getBookingsSummary;
