const updatePasswordHandler = require('../../handlers/customers/updatePasswordHandler');

const updatePassword = async (req, res) => {
  const data = req.body;
  try {
    const msg = await updatePasswordHandler(data);
    res.status(200).send(msg);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = updatePassword;