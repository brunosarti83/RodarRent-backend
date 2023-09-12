const getVehicleAvailabilityByIdHandler = require("../../handlers/vehicles/getVehicleAvailabilityByIdHandler");



const getVehicleAvailabilityById = async (req, res) => {
    try {
        const vehicleAvailability = await getVehicleAvailabilityByIdHandler(req.params)
        res.status(200).json(vehicleAvailability)
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message })
    }
}

module.exports = getVehicleAvailabilityById;