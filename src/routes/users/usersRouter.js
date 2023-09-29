const { Router } = require("express");

const createUser = require("../../controllers/users/createUser");

const router = Router();

router.get("/hc", (req, res) => {
  // healthcheck
  res.status(200).send("Server up");
});
router.post("/users", createUser);
//router.get("/users", getAllUsers);

module.exports = router;
