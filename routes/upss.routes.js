const { Router } = require("express");
const router = Router();

const {
  showUpss,
  createUpss,
  updateUpss,
  showUpssByBuilding,
} = require("../controllers/upss.controller");

router.get("/upss/:idCompany", showUpss);
router.get("/upss/:idupss/:idCompany", showUpssByBuilding);
router.post("/upss", createUpss);
router.put("/upss/:idupss", updateUpss);

// SCRIPTS

module.exports = router;
