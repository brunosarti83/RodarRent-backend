const forgotPasswordHandler = require('../../handlers/customers/forgotPasswordHandler');

const forgotPassword = async (req, res) => {
  const data = req.body;
  try {
    const msg = await forgotPasswordHandler(data);
    res.status(200).send(msg);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = forgotPassword;