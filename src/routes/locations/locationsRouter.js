const { Router } = require("express");

const {
  getAllLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
  getMostRequiredLocations,
} = require("../../controllers/locations");

const deleteLocationValidate = require("../../middlewares/locations/deleteLocationValidate");

const router = Router();

router.get("/locations", getAllLocations);
router.post("/locations", createLocation);
router.get("/locations/:id", getLocationById);
router.get("/location/mostRequired", getMostRequiredLocations);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocationValidate, deleteLocation);

module.exports = router;
