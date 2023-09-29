const { Booking } = require("../../db");
const { Op } = require("sequelize");
const CustomError = require("../../utils/customError");
const { startOfMonth, startOfDay } = require("date-fns");

const getIncomeBookingsHandler = async (data, res) => {
  try {
    const { option } = data;

    const currentDate = new Date();

    const whereCondition = {
      stateBooking: {
        [Op.ne]: "canceled",
      },
    };

    if (option === "YTD") {
      whereCondition.startDate = {
        [Op.gte]: startOfDay(new Date(currentDate.getFullYear(), 0, 1)),
        [Op.lte]: currentDate,
      };
    } else if (option === "MTD") {
      whereCondition.startDate = {
        [Op.gte]: startOfMonth(currentDate),
        [Op.lte]: currentDate,
      };
    } else if (option === "TODAY") {
      whereCondition.startDate = {
        [Op.gte]: startOfDay(currentDate),
        [Op.lte]: currentDate,
      };
    } else {
      throw new CustomError("Invalid option", 400);
    }

    const incomeBookings = await Booking.sum("amount", {
      where: whereCondition,
    });

    if (!incomeBookings) {
      throw new CustomError("There are no bookings for this date", 404);
    }

    return incomeBookings;
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};

module.exports = getIncomeBookingsHandler;
