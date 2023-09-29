const { Review } = require('../../db');

async function deleteReviewHandler(id) {
  const review = await Review.findByPk(id);
  if (!review) {
    throw new Error('La reseña no existe');
  }
  await review.destroy();
  return 'Reseña eliminada con éxito';
}

module.exports = deleteReviewHandler;
