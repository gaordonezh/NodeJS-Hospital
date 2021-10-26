const { Router } = require("express");
const router = Router();

const {
  showSchedules,
  createSchedule,
  updateSchedule,
} = require("../controllers/schedule.controller");

router.get("/schedules/:idCompany", showSchedules);
router.post("/schedules", createSchedule);
router.put("/schedules/:idschedule", updateSchedule);

// SCRIPTS

module.exports = router;
