const { Booking, Pay } = require("../../db");
const CustomError = require("../../utils/customError");
const mercadopago = require("mercadopago");
require("dotenv").config();

const cancelBookingHandler = async (data, id) => {
  const { ACCESS_TOKEN } = process.env;
  try {
    // console.log(data);
    const existingBooking = await Booking.findOne({ where: { id } });

    //console.log(idPay);

    if (!existingBooking) {
      throw new CustomError(`Booking with id ${id} not found`, 404);
    }
    if (
      existingBooking.stateBooking === "completed" ||
      existingBooking.stateBooking === "canceled"
    ) {
      throw new CustomError(
        `Cannot cancel booking with id ${id} because its status is completed o canceled`,
        400
      );
    }
    console.log(existingBooking.PayId);
    if (existingBooking.PayId === null) {
      data.stateBooking = "canceled";
      const updatedBooking = await Booking.update(data, {
        where: { id },
        return: true,
        raw: true,
      });
      return `Booking with id ${id} successfully canceled`;
    } else {
      const idPay = existingBooking.PayId;
      data.stateBooking = "canceled";
      const payment = await Pay.findOne({ where: { id: idPay } });
      const idMercadoPago = payment.dataValues.idMP;

      const updatedBooking = await Booking.update(data, {
        where: { id },
        return: true,
        raw: true,
      });

      mercadopago.configure({
        access_token: ACCESS_TOKEN,
      });
      var refund = {
        payment_id: idMercadoPago,
      };
      mercadopago.refund.create(refund).then((result) => {
        console.log(result.response);
      });
      if (updatedBooking[0] === 0) {
        throw new CustomError(`Can't cancel booking with id ${id}`, 500);
      } else {
        return `Booking with id ${id} successfully canceled and funds were refunded`;
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  cancelBookingHandler,
};
