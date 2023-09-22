const sendEmailHandler = require('../handlers/sendEmail/sendEmailHandler');

const sendEmail = async (req, res) => {
  const data = req.body;
  try {
    const response = await sendEmailHandler(data);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sendEmail;
