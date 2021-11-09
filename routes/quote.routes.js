const { Router } = require("express");
const router = Router();

const {
  showQuotes,
  createQuote,
  updateQuote,
  showFreeQuotes,
  showQuotesByUser,
} = require("../controllers/quote.controller");

router.get("/quotes/:idCompany", showQuotes);
router.get("/quotes/user/:patient", showQuotesByUser);
router.get("/free-quotes/:idCompany", showFreeQuotes);
router.post("/quotes", createQuote);
router.put("/quotes/:idquote", updateQuote);

// SCRIPTS

module.exports = router;
