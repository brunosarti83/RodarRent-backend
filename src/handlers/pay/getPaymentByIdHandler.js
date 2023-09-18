const { Op } = require('sequelize');
const { Pay } = require('../../db');

async function getPaymentByIdHandler(id) {
  const payment = await Pay.findOne({
    where: {
      id,
      isActive: {
        [Op.ne]: 'false',
      },
    },
  });
  return payment;
}

module.exports = getPaymentByIdHandler;
