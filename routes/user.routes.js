const { Router } = require("express");
const router = Router();

const {
  createUser,
  showUsers,
  showUsersByRol,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/login", login);
router.get("/users/:idCompany", showUsers);
router.get("/users-rol/:rol/:idCompany", showUsersByRol);
router.post("/users", createUser);
router.put("/users/:iduser", updateUser);
router.delete("/users/:iduser", deleteUser);

// SCRIPTS

module.exports = router;
