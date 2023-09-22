const createUserHandler = require("../../handlers/users/createUserHandler");

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const newUser = await createUserHandler(data);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
