const {
  deleteLocationHandler,
} = require("../../handlers/locations/deleteLocationHandler");

async function deleteLocation(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteLocationHandler(id);
    if (result) {
      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteLocation;
