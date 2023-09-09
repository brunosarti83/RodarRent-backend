/* eslint-disable object-curly-newline */
const { Pay, Booking } = require('../../db');
const CustomError = require('../../utils/customError');

async function createPayHandler({ id, idMP, amount, date, method, status }) {
  try {
    // eslint-disable-next-line object-shorthand
    const booking = await Booking.findOne({ where: { id: id } });
    const payment = await Pay.create({
      idMP,
      amount,
      date,
      method,
      status,
    });
    if (!payment) {
      throw new CustomError('Failed to create payment', 500);
    }
    await booking.setPay(payment);
    return payment;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
}

module.exports = createPayHandler;
