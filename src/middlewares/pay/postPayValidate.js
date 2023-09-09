/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
const postPayValidate = (req, res, next) => {
  const { id, idMP, amount, date, method, status } = req.body;
  console.log(req.body);

  if (!id) return res.status(404).json({ error: 'Missing id bookings' });
  if (!idMP)
    return res.status(404).json({ error: 'Missing idMP Mercado Pago' });
  if (!amount) return res.status(404).json({ error: 'Missing amount' });
  if (!date) return res.status(404).json({ error: 'Missing date' });
  if (!method) return res.status(404).json({ error: 'Missing pay method' });
  if (!status) return res.status(404).json({ error: 'Missing status' });

  next();
};

module.exports = postPayValidate;
