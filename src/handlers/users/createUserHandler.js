const { use } = require("passport");
const { User } = require("../../db");

const createUserHandler = async (data) => {
  const { role } = data;
  console.log(role);

  const user = await User.create({
    role,
  });
  return user;
};

module.exports = createUserHandler;
