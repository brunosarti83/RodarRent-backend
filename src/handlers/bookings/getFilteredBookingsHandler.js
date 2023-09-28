const { Booking } = require("../../db");
const { Op } = require("sequelize");
const CustomError = require("../../utils/customError");

const getFilteredBookingsHandler = async (data, res) => {
  try {
    const {
      CustomerId,
      stateBooking,
      startDate,
      finishDate,
      pickupLocationId,
      returnLocationId,
      bookingId,
      orderVar,
      orderMode,
      //limit,
    } = data;
    //deberiamos agregar desde algun lado el id del usuario para poder agregarlo a filter Conditions
    const filterConditions = [];

    if (CustomerId) {
      filterConditions.push({ CustomerId: CustomerId });
    }
    if (stateBooking) {
      filterConditions.push({ stateBooking: stateBooking });
    }
    if (startDate && finishDate) {
      filterConditions.push({
        startDate: { [Op.between]: [startDate, finishDate] },
      });
    }
    if (pickupLocationId) {
      filterConditions.push({ pickupLocationId: pickupLocationId });
    }
    if (returnLocationId) {
      filterConditions.push({ returnLocationId: returnLocationId });
    }
    if (bookingId) {
      filterConditions.push({ id: bookingId });
    }

    const orderOptions = [];

    if (orderMode && orderVar) {
      orderOptions.push([orderVar, orderMode.toUpperCase()]);
    }

    const filteredBookings = await Booking.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderOptions,
      //limit: parseInt(limit) || 1000,
    });

    if (filteredBookings.length === 0) {
      return [];
    }

    return filteredBookings;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};
module.exports = getFilteredBookingsHandler;
