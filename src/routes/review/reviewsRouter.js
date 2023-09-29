const { Router } = require('express');

const {
  createReview,
  getAllReviews,
  getReviewsByOrder,
  deleteReview,
} = require('../../controllers/review');
const { postReviewValidate } = require('../../middlewares/review/index');

const router = Router();

router.get('/hc', (req, res) => {
  res.status(200).send('OK');
});

router.post('/reviews', postReviewValidate, createReview);
router.get('/reviews', getAllReviews);
router.get('/review', getReviewsByOrder);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
