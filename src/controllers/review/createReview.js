const createReviewHandler = require('../../handlers/review/createReviewHandler');

async function createReview(req, res) {
  try {
    const newReview = await createReviewHandler(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
}

module.exports = createReview;
