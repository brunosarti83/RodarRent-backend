const { Customer } = require('../../db');
const CustomError = require('../../utils/customError');
const { comparePassword, hashPassword } = require('../../utils/passwordHasher');


const updatePasswordHandler = async (data) => {
  const { id, currentPassword, newPassword } = data;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer || !customer.isActive) {
      throw new CustomError(`Customer with id ${id} not found`, 404);
    } else {
      const passwordMatch = await comparePassword(currentPassword, customer.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        throw new CustomError(`Incorrect password for id ${id}`, 401); // Use 401 for authentication failure.
      } else {
        const hashedPassword = await hashPassword(newPassword);
        await Customer.update({ password: hashedPassword }, {
          where: { id: id, isActive: true }, return: true, raw: true,
        });
      }
      return `Password successfully updated`;
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; 
    } else {
      throw new CustomError(error.message, 500); 
    }
  }
};

module.exports = updatePasswordHandler;
