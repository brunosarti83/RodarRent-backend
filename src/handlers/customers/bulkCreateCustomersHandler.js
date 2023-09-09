const { Customer } = require('../../db');
const CustomError = require('../../utils/customError');
const { hashPassword } = require('../../utils/passwordHasher');

const bulkCreateCustomersHandler = async (data) => {
  try {
    const hashedData = [];

    for (const customer of data) {
      const hashedPassword = await hashPassword(customer.password);
      customer.password = hashedPassword;
      hashedData.push(customer);
    }

    const customers = await Customer.bulkCreate(hashedData);
    return customers;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = bulkCreateCustomersHandler;
