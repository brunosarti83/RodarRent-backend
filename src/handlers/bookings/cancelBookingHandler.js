const { Booking, Pay, Customer, Location } = require("../../db");
const CustomError = require("../../utils/customError");
const mercadopago = require("mercadopago");
require("dotenv").config();
const axios = require("axios");

const cancelBookingHandler = async (data, id) => {
  const { ACCESS_TOKEN, BACKEND_URL } = process.env;
  try {
    // console.log(data);
    const existingBooking = await Booking.findOne({
      where: { id },
      include: [
        {
          model: Customer,
        },
      ],
    });

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
    // console.log(existingBooking);
    // console.log(existingBooking.Customer);
    const pickUpLocation = await Location.findOne({
      where: {
        id: existingBooking.dataValues.pickUpLocationId,
      },
    });
    //console.log(pickUpLocation.dataValues.alias);
    const returnLocation = await Location.findOne({
      where: {
        id: existingBooking.dataValues.returnLocationId,
      },
    });
    const cancelData = {
      bookingId: existingBooking.dataValues.id,
      startDate: existingBooking.dataValues.startDate,
      finishDate: existingBooking.dataValues.finishDate,
      toEmailAddress: existingBooking.dataValues.Customer.email,
      subject: "Reservation Canceled",
      template: "bookingCancelation",
      replyToEmailAddress: "rodarrentadm@outlook.com",
      userName: existingBooking.dataValues.Customer.name,
      pickUpLocation: pickUpLocation,
      returnLocation: returnLocation,
      customer: existingBooking.Customer,
    };

    if (existingBooking.PayId === null) {
      data.stateBooking = "canceled";
      const updatedBooking = await Booking.update(data, {
        where: { id },
        return: true,
        raw: true,
      });
      // console.log(cancelData);
      await axios.post(`${BACKEND_URL}/sendemail`, cancelData);

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
      try {
        const result = await mercadopago.refund.create(refund);
        console.log(result.response);
      } catch (refundError) {
        console.error("Error en el reembolso de MercadoPago:", refundError);
      }

      if (updatedBooking[0] === 0) {
        throw new CustomError(`Can't cancel booking with id ${id}`, 500);
      } else {
        await axios.post(`${BACKEND_URL}/sendemail`, cancelData);
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
