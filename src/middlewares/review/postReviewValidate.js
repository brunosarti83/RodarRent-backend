const { Booking } = require('../../db');

const postReviewValidate = async (req, res, next) => {
  const { CustomerId, rating, review } = req.body;

  if (!CustomerId) return res.status(404).json({ error: 'Missing CustomerID' });
  if (!rating) return res.status(404).json({ error: 'Missing rating' });
  if (!review) return res.status(404).json({ error: 'Missing review' });

  const bookings = await Booking.findAll({ where: { CustomerId } });

  if (!bookings || bookings.length === 0) {
    return res
      .status(400)
      .json({ error: 'No booking found for this customer' });
  }

  const completedBooking = bookings.find(
    (booking) => booking.stateBooking === 'completed',
  );

  if (!completedBooking) {
    return res
      .status(400)
      .json({ error: 'You need a completed booking to post a review' });
  }

  next();
};

module.exports = postReviewValidate;
