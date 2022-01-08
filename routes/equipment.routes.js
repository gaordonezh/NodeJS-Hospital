const { Router } = require("express");
const router = Router();

const {
  showEquipments,
  showEquipmentById,
  createEquipment,
  updateEquipment,
  getEquipmentsByRoom,
} = require("../controllers/equipment.controller");

router.get("/equipments/:idCompany", showEquipments);
router.get("/equipment-id/:equipment", showEquipmentById);
router.get("/equipments/:idRoom/:idCompany", getEquipmentsByRoom);
router.post("/equipments", createEquipment);
router.put("/equipments/:idEquipment", updateEquipment);

// SCRIPTS

module.exports = router;
