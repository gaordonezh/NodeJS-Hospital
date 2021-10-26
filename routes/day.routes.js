const { Router } = require("express");
const router = Router();

const {
  showDays,
  createDay,
  updateDay,
} = require("../controllers/day.controller");

router.get("/days/:idCompany", showDays);
router.post("/days", createDay);
router.put("/days/:idday", updateDay);

// SCRIPTS

module.exports = router;
