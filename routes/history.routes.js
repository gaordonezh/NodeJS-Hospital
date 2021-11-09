const { Router } = require("express");
const router = Router();

const {
  showHistories,
  createHistory,
} = require("../controllers/history.controller");

router.get("/histories/:company", showHistories);
router.post("/histories", createHistory);

// SCRIPTS

module.exports = router;
