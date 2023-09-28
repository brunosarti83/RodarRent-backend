const { Booking, Location } = require("../../db");
const { Op } = require("sequelize");
const CustomError = require("../../utils/customError");

const getMostRequiredLocationsHandler = async (req, res) => {
  try {
    // Buscar todas las reservaciones con stateBooking = 'completed'
    const completedBookings = await Booking.findAll({
      where: {
        stateBooking: "completed",
      },
      attributes: ["pickUpLocationId", "returnLocationId"], // Seleccionar solo las columnas de ubicación
    });

    // Crear un array para almacenar todas las ubicaciones (tanto de recogida como de devolución)
    const allLocationIds = [];

    // Recorrer las reservaciones completadas y agregar las ubicaciones al array
    completedBookings.forEach((booking) => {
      if (booking.pickUpLocationId) {
        allLocationIds.push(booking.pickUpLocationId);
      }
      if (booking.returnLocationId) {
        allLocationIds.push(booking.returnLocationId);
      }
    });

    // Inicializar un objeto para contar las ubicaciones por su ID
    const locationCounts = {};

    // Contar cuántas veces se repite cada ID en el array
    allLocationIds.forEach((locationId) => {
      locationCounts[locationId] = (locationCounts[locationId] || 0) + 1;
    });
    const resultsWithAlias = [];

    // Recorremos el objeto locationCounts y buscamos los alias en el modelo Location
    for (const locationId in locationCounts) {
      const count = locationCounts[locationId];
      // Encuentra el alias correspondiente en el modelo Location
      const location = await Location.findByPk(locationId);
      if (location) {
        const alias = location.alias;
        resultsWithAlias.push({ alias, count });
      }
    }
    // Devolver el resultado como un objeto JSON
    return resultsWithAlias;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = getMostRequiredLocationsHandler;
