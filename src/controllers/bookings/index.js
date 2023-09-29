const createBooking = require("./createBooking");
const getAllBookings = require("./getAllBookings");
const getBookingById = require("./getBookingById");
const updateBooking = require("./updateBooking");
const deleteBooking = require("./deleteBooking");
const getFilteredBookings = require("./getFilteredBookings");
const cancelBooking = require("./cancelBooking");
const getBookingsSummary = require("./getBookingsSummary");
const getHistoryBookings = require("./getHistoryBookings");
const getFutureBookings = require("./getFutureBookings");
const getMostRequiredBrands = require("./getMostRequiredBrands");

module.exports = {
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
};
