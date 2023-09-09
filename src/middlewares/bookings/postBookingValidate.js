const { Customer, Vehicle } = require('../../db');

const postBookingValidate = async (req, res, next) => {
  const {
    startDate,
    finishDate,
    pickUpLocationId,
    returnLocationId,
    CustomerId,
    VehicleId,
    pricePerDay,
  } = req.body;

  if (!startDate) return res.status(404).json({ error: 'Missing start date' });
  if (!finishDate)
    return res.status(404).json({ error: 'Missing finish date' });
  if (!pickUpLocationId)
    return res.status(404).json({ error: 'Missing pick up location' });
  if (!returnLocationId)
    return res.status(404).json({ error: 'Missing return location' });
  if (!CustomerId) return res.status(404).json({ error: 'Missing customer' });
  if (!VehicleId) return res.status(404).json({ error: 'Missing vehicle Id' });
  if (!pricePerDay)
    return res.status(404).json({ error: 'Missing price per day' });
  const customer = await Customer.findByPk(CustomerId);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  const vehicle = await Vehicle.findByPk(VehicleId);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  next();
};

module.exports = postBookingValidate;
