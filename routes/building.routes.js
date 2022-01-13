const { Router } = require("express");
const router = Router();

const {
  showBuildings,
  createBuilding,
  updateBuilding,
  showAllAssigments,
} = require("../controllers/building.controller");

router.get("/map/:idCompany", showAllAssigments);
router.get("/buildings/:idCompany", showBuildings);
router.post("/buildings", createBuilding);
router.put("/buildings/:idbuilding", updateBuilding);

// SCRIPTS

module.exports = router;
