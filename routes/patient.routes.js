const { Router } = require("express");
const router = Router();

const {
  showPatients,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

router.get("/patients/:idCompany", showPatients);
router.post("/patients", createPatient);
router.put("/patients/:idpatient", updatePatient);
router.delete("/patients/:idpatient", deletePatient);

// SCRIPTS

module.exports = router;
