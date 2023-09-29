const { Review } = require('../../db');
const CustomError = require('../../utils/customError');

async function createReviewHandler({ CustomerId, rating, review }) {
  try {
    // console.log(BookingId);
    const newReview = await Review.create({ CustomerId, rating, review });
    if (!newReview) {
      throw new CustomError('Failed to create a new review', 500);
    }
    return newReview;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
}

module.exports = createReviewHandler;
