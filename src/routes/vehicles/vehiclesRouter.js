const { Router } = require('express');

const {
    createVehicles,
    getVehicleById,
    getAllVehicles,
    updateVehicle,
    getAllAvailable,
    deleteVehicleById,
    getVehicleAvailabilityById,
} = require('../../controllers/vehicles');
  
const {
    postVehiclesValidate
} = require('../../middlewares/vehicles');
  
const router = Router();
  
router.post("/vehicles", postVehiclesValidate, createVehicles);
router.get("/vehicles/:id", getVehicleById);
router.get("/vehicles", getAllVehicles);
router.put("/vehicles", updateVehicle);
router.get("/available/:id/:startDate/:finishDate", getVehicleAvailabilityById)
router.get("/available", getAllAvailable);
router.delete("/vehicles/:id", deleteVehicleById);
  
module.exports = router;