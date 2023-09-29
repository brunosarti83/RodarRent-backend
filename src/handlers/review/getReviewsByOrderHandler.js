const { Op } = require('sequelize');
const { Review, Customer } = require('../../db');

async function getReviewsByOrderHandler(order) {
  let reviews;
  const commonOptions = {
    include: {
      model: Customer,
      attributes: ['name'],
    },
    order: [['createdAt', 'DESC']], // Sort by date in descending order
  };

  if (order === 'desc') {
    reviews = await Review.findAll({
      ...commonOptions,
      where: {
        rating: {
          [Op.or]: [4, 5], // Filter reviews with rating 4 and 5
        },
      },
      order: [['rating', 'DESC'], ...commonOptions.order], // Add rating sorting
    });
  } else if (order === 'asc') {
    reviews = await Review.findAll({
      ...commonOptions,
      where: {
        rating: {
          [Op.or]: [1, 2], // Filter reviews with rating 1 and 2
        },
      },
      order: [['rating', 'ASC'], ...commonOptions.order], // Add rating sorting
    });
  } else if (order === 'date') {
    reviews = await Review.findAll(commonOptions);
  }

  return reviews;
}

module.exports = getReviewsByOrderHandler;
