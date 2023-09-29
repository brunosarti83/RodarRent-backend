const getAllReviewsHandler = require('../../handlers/review/getAllReviewsHandler');

async function getAllReviews(req, res) {
  try {
    const reviews = await getAllReviewsHandler();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllReviews;
