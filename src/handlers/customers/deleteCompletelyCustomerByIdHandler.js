const { Customer } = require('../../db');
const CustomError = require('../../utils/customError');

const deleteCompletelyCustomerByIdHandler = async (id) => {
  
  try {
    const deletedCustomer = await Customer.findByPk(id);
    
      
      if(!deletedCustomer) throw new CustomError(`There's no customer matching id ${Customerid}`,404)
    await deletedCustomer.destroy();
    return `Customer with id ${id} has been delete`
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = deleteCompletelyCustomerByIdHandler;
