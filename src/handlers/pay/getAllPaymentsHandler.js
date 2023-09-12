const { Op } = require('sequelize');
const { Pay } = require('../../db');

async function getAllPaymentsHandler() {
  const payments = await Pay.findAll();
  return payments;
}

module.exports = getAllPaymentsHandler;
