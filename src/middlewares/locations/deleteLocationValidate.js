const deleteLocationValidate = (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ error: "Missing id" });

  next();
};

module.exports = deleteLocationValidate;
