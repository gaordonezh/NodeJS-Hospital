const { Router } = require("express");
const router = Router();

const {
  showDays,
  createDay,
  updateDay,
  freeDays,
} = require("../controllers/day.controller");

router.get("/days/:idCompany", showDays);
router.post("/days", createDay);
router.put("/days/:idday", updateDay);
router.get("/free-days/:iddoctor/:date", freeDays);

// SCRIPTS

module.exports = router;
