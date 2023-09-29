const getMostRequiredBrandsHandler = require("../../handlers/bookings/getMostRequiredBrandsHandler");

const getMostRequiredBrands = async (req, res) => {
  try {
    const requiredBrands = await getMostRequiredBrandsHandler();

    res.status(200).json(requiredBrands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMostRequiredBrands;
