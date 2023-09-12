const createVehicles = require('./createVehicles');
const getAllAvailable = require('./getAllAvailable');
const getAllVehicles = require('./getAllVehicles');
const getVehicleById = require('./getVehicleById');
const updateVehicle = require('./updateVehicle');
const deleteVehicleById = require('./deleteVehicleById');
const getVehicleAvailabilityById = require('./getVehicleAvailabilityById');

module.exports = {
  createVehicles,
  getAllAvailable,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicleById,
  getVehicleAvailabilityById,
};