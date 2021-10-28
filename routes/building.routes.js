const { Router } = require("express");
const router = Router();

const {
  showBuildings,
  createBuilding,
  updateBuilding,
} = require("../controllers/building.controller");

router.get("/buildings/:idCompany", showBuildings);
router.post("/buildings", createBuilding);
router.put("/buildings/:idbuilding", updateBuilding);

// SCRIPTS

module.exports = router;
