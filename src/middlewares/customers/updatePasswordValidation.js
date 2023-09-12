const updatePasswordValidation = (req, res, next) => {
  const {id,currentPassword,newPassword} = req.body;

  if (!id) return res.status(404).json({ error: 'Missing id' });
  if (!currentPassword) return res.status(404).json({ error: 'Missing current password' });
  if (!newPassword) return res.status(404).json({ error: 'Missing new password' });

  next();
  };

  module.exports = updatePasswordValidation;