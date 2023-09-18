const { Pay } = require('../../db');

async function getAllPaymentsHandler() {
  const payments = await Pay.findAll({
    where: {
      isActive: true,
    },
  });
  return payments;
}

module.exports = getAllPaymentsHandler;
