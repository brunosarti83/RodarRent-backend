const { Booking, Vehicle } = require("../../db");
const { Op } = require("sequelize");
const CustomError = require("../../utils/customError");

const getMostRequiredBrandsHandler = async (req, res) => {
  try {
    const completedBookings = await Booking.findAll({
      where: {
        stateBooking: "completed",
      },
      include: [Vehicle],
    });

    const modelCounts = {};

    for (const booking of completedBookings) {
      const model = booking.Vehicle.brand;

      if (modelCounts[model]) {
        modelCounts[model]++;
      } else {
        modelCounts[model] = 1;
      }
    }

    const modelCountsArray = Object.entries(modelCounts).map(
      ([model, count]) => ({
        model,
        count,
      })
    );

    modelCountsArray.sort((a, b) => b.count - a.count);

    const top6Models = modelCountsArray.slice(0, 6);

    return top6Models;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = getMostRequiredBrandsHandler;
