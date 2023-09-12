const getVehiclesHandler = require("../../handlers/vehicles/getVehiclesHandler");


const getAllVehicles = async (req, res) => {
    try {
        const allVehicles = await getVehiclesHandler(req.query)
        res.status(200).json(allVehicles)
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message })
    }
}

module.exports = getAllVehicles;