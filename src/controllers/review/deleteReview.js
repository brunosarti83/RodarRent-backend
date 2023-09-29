const deleteReviewHandler = require('../../handlers/review/deleteReviewHandler');

async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const message = await deleteReviewHandler(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteReview;
