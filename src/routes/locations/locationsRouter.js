const { Router } = require("express");

const {
  getAllLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
} = require("../../controllers/locations");

const deleteLocationValidate = require("../../middlewares/locations/deleteLocationValidate");

const router = Router();

router.get("/locations", getAllLocations);
router.post("/locations", createLocation);
router.get("/locations/:id", getLocationById);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocationValidate, deleteLocation);

module.exports = router;
