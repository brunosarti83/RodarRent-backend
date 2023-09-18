const { Review, Customer } = require('../../db');

async function getAllReviewsHandler() {
  const reviews = await Review.findAll({
    include: [
      {
        model: Customer,
        attributes: ['name', 'lastName'], // specify the attributes you want
      },
    ],
  });
  return reviews;
}

module.exports = getAllReviewsHandler;
