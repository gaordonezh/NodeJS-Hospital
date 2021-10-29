const { Router } = require("express");
const router = Router();

const {
  showLevels,
  createLevel,
  updateLevel,
  showLevelsByBuilding,
} = require("../controllers/level.controller");

router.get("/levels/:idCompany", showLevels);
router.get("/levels/:idBuilding/:idCompany", showLevelsByBuilding);
router.post("/levels", createLevel);
router.put("/levels/:idlevel", updateLevel);

// SCRIPTS

module.exports = router;
