const { Router } = require("express");
const router = Router();

const {
  showRooms,
  createRoom,
  updateRoom,
} = require("../controllers/room.controller");

router.get("/rooms/:idCompany", showRooms);
router.post("/rooms", createRoom);
router.put("/rooms/:idroom", updateRoom);

// SCRIPTS

module.exports = router;
