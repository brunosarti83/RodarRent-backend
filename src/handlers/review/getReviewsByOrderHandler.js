const { Review } = require('../../db');

async function getReviewsByOrderHandler(order) {
  let reviews;
  if (order === 'desc') {
    reviews = await Review.findAll({
      order: [
        ['rating', 'DESC'],
        ['createdAt', 'DESC'], // add this line to sort by timestamp
      ],
    });
  } else if (order === 'asc') {
    reviews = await Review.findAll({
      order: [
        ['rating', 'ASC'],
        ['createdAt', 'DESC'], // add this line to sort by timestamp
      ],
    });
  } else if (order === 'date') {
    reviews = await Review.findAll({
      order: [['createdAt', 'DESC']], // sort by timestamp only
    });
  }

  return reviews;
}

module.exports = getReviewsByOrderHandler;
