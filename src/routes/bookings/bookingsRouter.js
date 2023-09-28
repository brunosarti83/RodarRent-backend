const { Router } = require("express");

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getFilteredBookings,
  cancelBooking,
  getBookingsSummary,
  getHistoryBookings,
  getFutureBookings,
  getMostRequiredBrands,
} = require("../../controllers/bookings");

const postBookingValidate = require("../../middlewares/bookings/postBookingValidate");
const deleteBookingValidation = require("../../middlewares/bookings/deleteBookingValidation");
const getIncomeBookings = require("../../controllers/bookings/getIncomeBookings");

const router = Router();

router.get("/hc", (req, res) => {
  // healthcheck
  res.status(200).send("Server up");
});
router.post("/bookings", postBookingValidate, createBooking);
router.get("/bookings", getAllBookings);
router.get("/booking/filter", getFilteredBookings);
router.get("/booking/summary", getBookingsSummary);
router.get("/booking/income", getIncomeBookings);
router.get("/booking/history", getHistoryBookings);
router.get("/booking/future", getFutureBookings);
router.get("/booking/mostRequiredBrands", getMostRequiredBrands);
router.get("/bookings/:id", getBookingById);
router.put("/bookings/:id", updateBooking);
router.put("/bookings/cancel/:id", cancelBooking);
router.delete("/bookings/:id", deleteBookingValidation, deleteBooking);

module.exports = router;
