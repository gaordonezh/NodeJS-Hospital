const { Router } = require("express");
const router = Router();

const {
  showMaintenances,
  createMaintenance,
  updateMaintenance,
  updateDates,
  updateStock,
} = require("../controllers/maintenance.controller");

router.get("/maintenances/:idEquiment", showMaintenances);
router.post("/maintenances", updateDates, updateStock, createMaintenance);
router.put("/maintenances/:idMaintenance", updateMaintenance);

// SCRIPTS

module.exports = router;
