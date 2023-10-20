const { Booking } = require("../../db");
const { calculateAmount } = require("../../utils/calculateAmount");

const createBookingHandler = async (data) => {
  const {
    VehicleId,
    CustomerId,
    startDate,
    finishDate,
    pricePerDay,
    pickUpLocationId,
    returnLocationId,
  } = data;
  // calcular amount
  data.amount = calculateAmount(startDate, finishDate, pricePerDay);
  
  //creamos la reserva en la BDD
  const booking = await Booking.create(data);
  return booking;
};

module.exports = {
  createBookingHandler,
};
