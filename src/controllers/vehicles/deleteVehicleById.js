const deleteVehicleByIdHandler = require('../../handlers/vehicles/deleteVehicleByIdHandler');

const deleteVehicleById = async (req, res) => {
  const {id} = req.params
  try {
    const vehicle = await deleteVehicleByIdHandler(id);
    res.status(200).json(`${vehicle.id} deleted`);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = deleteVehicleById;