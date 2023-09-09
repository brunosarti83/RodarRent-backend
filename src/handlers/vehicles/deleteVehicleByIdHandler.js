const { Vehicle } = require('../../db');
const CustomError = require('../../utils/customError');

const deleteVehicleByIdHandler = async (id) => {
  
  try {
    const deletedVehicle = await Vehicle.update({isActive:false}, {
      where: { id:id }, 
      return: true, 
      raw:true,
    });
    if(!deletedVehicle) throw new CustomError(`There's no customer matching id ${id}`,404)
    return deletedCustomer
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = deleteVehicleByIdHandler;