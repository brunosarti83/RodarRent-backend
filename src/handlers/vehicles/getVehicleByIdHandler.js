const { Vehicle } = require('../../db');
const CustomError = require('../../utils/customError');

const getVehicleByIdHandler = async (id) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) throw new CustomError(`There's no vehicle matching id ${id}`, 404)
    return vehicle
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = getVehicleByIdHandler;