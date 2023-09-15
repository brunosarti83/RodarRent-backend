const { Location } = require("../../db");

async function deleteLocationHandler(id) {
  const location = await Location.findByPk(id);
  if (location) {
    await location.update({ isActive: false });
    return true;
  }
  return false;
}

module.exports = { deleteLocationHandler };
