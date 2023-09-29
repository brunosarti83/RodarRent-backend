const forgotPasswordValidation = (req, res, next) => {
  const {email} = req.body;

  if (!email) return res.status(404).json({ error: 'Missing email' });

  next();
  };

  module.exports = forgotPasswordValidation;