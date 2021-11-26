const { Router } = require("express");
const router = Router();

const {
  createCompany,
  showCompanies,
  updateCompany,
} = require("../controllers/company.controller");

router.get("/companies", showCompanies);
router.post("/companies", createCompany);
router.put("/companies/:company", updateCompany);

// SCRIPTS

module.exports = router;
