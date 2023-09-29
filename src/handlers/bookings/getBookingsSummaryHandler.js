const { Booking } = require("../../db");
const sequelize = require("sequelize");

// Función para asignar colores basados en el estado
function getColorForState(state) {
  switch (state) {
    case "confirmed":
      return "verde";
    case "canceled":
      return "rojo";
    case "completed":
      return "azul";
    case "pending":
      return "amarillo";
    default:
      return "gris";
  }
}

const getBookingsSummaryHandler = async (req, res) => {
  try {
    const bookingSummary = await Booking.findAll({
      attributes: [
        "stateBooking",
        [sequelize.fn("count", sequelize.col("stateBooking")), "count"],
      ],
      group: ["stateBooking"],
      raw: true,
    });

    // Mapea los resultados y agrega la propiedad "color" a cada objeto
    const summaryWithColor = bookingSummary.map((summary) => ({
      ...summary,
      color: getColorForState(summary.stateBooking),
    }));

    return summaryWithColor;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while retrieving the bookings summary" });
  }
};

module.exports = { getBookingsSummaryHandler };
