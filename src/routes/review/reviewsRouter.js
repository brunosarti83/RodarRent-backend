const { Router } = require('express');
const { Review } = require('../../db');

const {
  createReview,
  getAllReviews,
  getReviewsByOrder,
} = require('../../controllers/review');
const { postReviewValidate } = require('../../middlewares/review/index');

const router = Router();

router.get('/hc', (req, res) => {
  res.status(200).send('OK');
});

router.post('/reviews', postReviewValidate, createReview);
router.get('/reviews', getAllReviews);
router.get('/review', getReviewsByOrder);

module.exports = router;
