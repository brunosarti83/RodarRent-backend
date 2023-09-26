const { Customer } = require('../../db');
const CustomError = require('../../utils/customError');
const { newPassword } = require('../../utils/newPassword');
const { hashPassword } = require('../../utils/passwordHasher');

const forgotPasswordHandler = async (data) => {
  const { email } = data;

  try {
    const customer = await Customer.findOne({ where: { email } });

    if (!customer || !customer.isActive) {
      throw new CustomError(`Customer with email ${email} not found`, 404);
    } else {
      const newRandomPassword = newPassword()
      const hashedPassword = await hashPassword(newRandomPassword);
      await Customer.update({ password: hashedPassword },{where: { email },return: true,raw: true,});
      return {id: customer.id,name:customer.name,password:newRandomPassword};
    }
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = forgotPasswordHandler;
