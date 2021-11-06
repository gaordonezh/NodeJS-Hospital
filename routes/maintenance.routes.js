const { Router } = require("express");
const router = Router();

const {
  showMaintenances,
  createMaintenance,
  updateMaintenance,
} = require("../controllers/maintenance.controller");

router.get("/maintenances/:idEquiment", showMaintenances);
router.post("/maintenances", createMaintenance);
router.put("/maintenances/:idMaintenance", updateMaintenance);

// SCRIPTS

module.exports = router;
