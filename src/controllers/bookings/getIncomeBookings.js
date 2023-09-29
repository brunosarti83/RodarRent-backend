const getIncomeBookingsHandler = require("../../handlers/bookings/getIncomeBookingsHandler");

const getIncomeBookings = async (req, res) => {
  const data = req.query;
  console.log(data);
  //const customerId = req.query.CustomerId (tenemos que poder traer solo las reservas del cliente que esta logueado)
  try {
    const incomeBookings = await getIncomeBookingsHandler(data, res);

    res.status(200).json(incomeBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getIncomeBookings;
