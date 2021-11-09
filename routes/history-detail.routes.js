const { Router } = require("express");
const router = Router();

const {
  showHistoryDetails,
  createHistoryDetail,
  updateHistoryDetail,
} = require("../controllers/history-detail.controller");

router.get("/attentions/:company/:history", showHistoryDetails);
router.post("/attentions", createHistoryDetail);
router.put("/attentions/:idAttention", updateHistoryDetail);

// SCRIPTS

module.exports = router;
