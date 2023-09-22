const { Op } = require('sequelize');
const { Review, Customer } = require('../../db');

async function getReviewsByOrderHandler(order) {
  let reviews;
  if (order === 'desc') {
    reviews = await Review.findAll({
      include: {
        model: Customer,
        attributes: ['name'],
      },
      where: {
        rating: {
          [Op.or]: [4, 5], // Filtra las revisiones con rating 4 y 5
        },
      },
      order: [
        ['rating', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
  } else if (order === 'asc') {
    reviews = await Review.findAll({
      include: {
        model: Customer,
        attributes: ['name'],
      },
      where: {
        rating: {
          [Op.or]: [1, 2], // Filtra las revisiones con rating 1 y 2
        },
      },
      order: [
        ['rating', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
  } else if (order === 'date') {
    reviews = await Review.findAll({
      include: {
        model: Customer,
        attributes: ['name'],
      },
      order: [['createdAt', 'DESC']],
    });
  }

  return reviews;
}

module.exports = getReviewsByOrderHandler;
