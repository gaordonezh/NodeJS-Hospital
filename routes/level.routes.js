const { Router } = require("express");
const router = Router();

const {
  showLevels,
  createLevel,
  updateLevel,
} = require("../controllers/level.controller");

router.get("/levels/:idCompany", showLevels);
router.post("/levels", createLevel);
router.put("/levels/:idlevel", updateLevel);

// SCRIPTS

module.exports = router;
