const { Booking } = require("../../db");
const CustomError = require("../../utils/customError");

const updateBookingHandler = async (data, id) => {
  try {
    const existingBooking = await Booking.findOne({ where: { id } });
    const oldStartDate = existingBooking.startDate;
    const oldFinishDate = existingBooking.finishDate;
    const oldAmount = existingBooking.amount;

    if (!existingBooking) {
      throw new CustomError(`Booking with id ${id} not found`, 404);
    }
    if (
      existingBooking.stateBooking === "completed" ||
      existingBooking.status === "canceled"
    ) {
      throw new CustomError(
        `Cannot update booking with id ${id} because its status is completed o canceled`,
        400
      );
    }

    const updatedBooking = await Booking.update(data, {
      where: { id },
      return: true,
      raw: true,
    });

    if (updatedBooking[0] === 0) {
      throw new CustomError(`Can't update booking with id ${id}`, 400);
    } else {
      return `Booking with id ${id} succesfully updated`;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateBookingHandler,
};
