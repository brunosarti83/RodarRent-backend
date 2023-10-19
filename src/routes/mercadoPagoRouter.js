const { Router } = require("express");
const createOrder = require("../controllers/mercadoPago");
const receiveWebhook = require("../controllers/receiveWebhook");
const { Booking, Pay, Customer, Vehicle, Location } = require("../db");
require("dotenv").config();
const {
  updateBookingHandler,
} = require("../handlers/bookings/updateBookingHandler");
const axios = require("axios");

const { CLIENT_URL, BACKEND_URL } = process.env;

const router = Router();

// flow is > createOrder(receives req from Client, setsUp payLink) > 
// webhooks(expects payment, when received creates pay on db) > 
// success(receives pay updates booking) / failure

router.get("/createorder", createOrder);

// from createorder if success : (this could be separate controller)
router.get("/success", async (req, res, next) => {
  // receives payment_id from query
  const { query } = req;
  const idMP = parseInt(query.payment_id, 10);
  
  const pay = await Pay.findOne({
    where: {
      idMP,
    },
    include: [
      {
        model: Booking,
        include: [
          {
            model: Customer,
          },
        ],
      },
    ],
  });

  //console.log(pay.Booking.dataValues.id);
  if (pay && pay.Booking) {
    await updateBookingHandler(
      { stateBooking: "confirmed" },
      pay.Booking.dataValues.id
    );
    //console.log(pay.Booking.dataValues);
    const vehicle = await Vehicle.findOne({
      where: {
        id: pay.Booking.dataValues.VehicleId,
      },
    });
    //console.log(vehicle);
    const pickUpLocation = await Location.findOne({
      where: {
        id: pay.Booking.dataValues.pickUpLocationId,
      },
    });
    //console.log(pickUpLocation.dataValues.alias);
    const returnLocation = await Location.findOne({
      where: {
        id: pay.Booking.dataValues.returnLocationId,
      },
    });

    //console.log(returnLocation);
    const data = {
      toEmailAddress: pay.Booking.dataValues.Customer.email,
      subject: "Reservation Confirmed",
      template: "bookingConfirmation",
      replyToEmailAddress: "rodarrentadm@outlook.com",
      userName: pay.Booking.dataValues.Customer.name,
      bookingId: pay.Booking.dataValues.id,
      startDate: pay.Booking.dataValues.startDate,
      finishDate: pay.Booking.dataValues.finishDate,
      pickUpLocation: pickUpLocation,
      returnLocation: returnLocation,
      vehicle: vehicle,
      customer: pay.Booking.dataValues.Customer,
    };
    //console.log(data);
    // sends confirmation email to user
    await axios.post(`${BACKEND_URL}/sendemail`, data);
    // redirects user to frontend/customer/:customerId
    res.redirect(`${CLIENT_URL}/customer/${pay.Booking.dataValues.CustomerId}`);
  } else if (pay) {
    next(
      new Error(
        "Se encontró un registro Pay, pero no tiene una reserva asociada"
      )
    );
  } else {
    next(new Error("No se encontró un registro con ese idMP"));
  }
});

router.get("/failure", (req, res) => res.send("Failure"));

router.get("/pending", (req, res) => res.send("Pending"));

router.post("/webhook", receiveWebhook);

module.exports = router;
