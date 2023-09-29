const { Customer} = require('../../db');
const Sequelize = require('sequelize');
const {Op} = Sequelize
const CustomError = require('../../utils/customError');
const { hashPassword } = require('../../utils/passwordHasher');

const createCustomerHandler = async (data) => {
  const {
    name,
    lastName,
    personalId,
    birthDate,
    address,
    city,
    country,
    zipCode,
    phoneNumber,
    email,
    password,
  } = data;

  try {
    const hashedPassword = await hashPassword(password);
    const foundCustomer = await Customer.findOne({
      where: {
        [Op.or]: [{ personalId }, { email }],
      },
    });
    data = { ...data, password: hashedPassword, isActive: true, UserId: 2};
    if (foundCustomer) {
      if (!foundCustomer.isActive) {
        const updated = await Customer.update(data, {
          where: { email: foundCustomer.email },
          return: true,
          raw: true,
        });
        return updated;
      } else {
        throw new CustomError('Customer already registered with that email', 409);
      }
    } else {
      const created = await Customer.create(data);
      return created;
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode)
    } else {
      throw new CustomError(error.message, 500);
    }
  }
};

module.exports = createCustomerHandler;
