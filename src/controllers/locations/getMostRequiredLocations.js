const getMostRequiredLocationsHandler = require("../../handlers/locations/getMostRequiredLocationsHandler");

const getMostRequiredLocations = async (req, res) => {
  try {
    const requiredLocations = await getMostRequiredLocationsHandler();

    res.status(200).json(requiredLocations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMostRequiredLocations;
