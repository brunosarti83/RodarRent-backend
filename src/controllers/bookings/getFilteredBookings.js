const getFilteredBookingsHandler = require("../../handlers/bookings/getFilteredBookingsHandler");

const getFilteredBookings = async (req, res) => {
  const data = req.query;
  console.log(data);
  //const customerId = req.query.CustomerId (tenemos que poder traer solo las reservas del cliente que esta logueado)
  try {
    const filteredBookings = await getFilteredBookingsHandler(data, res);

    res.status(200).json(filteredBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFilteredBookings;
