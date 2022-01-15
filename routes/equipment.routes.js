const { Router } = require("express");
const router = Router();

const {
  showEquipments,
  showEquipmentById,
  createEquipment,
  updateEquipment,
  getEquipmentsByRoom,
  uploadEquipment,
} = require("../controllers/equipment.controller");
const { uploadExcel } = require("../helpers/excelToJson");

router.get("/equipments/:idCompany", showEquipments);
router.get("/equipment-id/:equipment", showEquipmentById);
router.get("/equipments/:idRoom/:idCompany", getEquipmentsByRoom);
router.post("/equipments", createEquipment);
router.post("/upload/equipments/:company", uploadExcel, uploadEquipment);
router.put("/equipments/:idEquipment", updateEquipment);

// SCRIPTS

module.exports = router;
