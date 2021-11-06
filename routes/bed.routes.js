const { Router } = require("express");
const router = Router();

const {
  showBeds,
  createBed,
  updateBed,
  getBedsByRoom,
} = require("../controllers/bed.controller");

router.get("/beds/:idCompany", showBeds);
router.get("/beds/:idRoom/:idCompany", getBedsByRoom);
router.post("/beds", createBed);
router.put("/beds/:idbed", updateBed);

// SCRIPTS

module.exports = router;
