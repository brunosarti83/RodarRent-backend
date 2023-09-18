const postReviewValidate = (req, res, next) => {
  const { CustomerId, rating, review } = req.body;

  if (!CustomerId) return res.status(404).json({ error: 'Missing CustomerID' });
  if (!rating) return res.status(404).json({ error: 'Missing rating' });
  if (!review) return res.status(404).json({ error: 'Missing review' });

  next();
};

module.exports = postReviewValidate;
