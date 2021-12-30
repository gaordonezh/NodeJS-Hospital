const { Router } = require("express");
const router = Router();

const {
  showInsumos,
  createInsumo,
  updateInsumo,
  deleteInsumo,
} = require("../controllers/insumo.controller");

router.get("/insumos/:idCompany", showInsumos);
router.post("/insumos", createInsumo);
router.put("/insumos/:idinsumo", updateInsumo);
router.delete("/insumos/:idinsumo", deleteInsumo);

module.exports = router;
