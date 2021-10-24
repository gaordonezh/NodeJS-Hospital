const { Router } = require("express");
const router = Router();

const {
  createCompany,
  showCompanies,
} = require("../controllers/company.controller");

router.get("/companies", showCompanies);
router.post("/companies", createCompany);

// SCRIPTS

module.exports = router;
