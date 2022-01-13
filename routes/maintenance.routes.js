const { Router } = require("express");
const router = Router();

const {
  showMaintenances,
  createMaintenance,
  updateMaintenance,
  updateDates,
  updateStock,
} = require("../controllers/maintenance.controller");
const {
  showMaintenancesByDates,
} = require("../controllers/equipment.controller");

router.get("/maintenances/:idEquiment", showMaintenances);
router.get("/maintenances/dates/:company", showMaintenancesByDates);
router.post("/maintenances", updateDates, updateStock, createMaintenance);
router.put("/maintenances/:idMaintenance", updateMaintenance);

// SCRIPTS

module.exports = router;
