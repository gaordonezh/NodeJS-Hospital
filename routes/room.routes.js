const { Router } = require("express");
const router = Router();

const {
  showRooms,
  createRoom,
  updateRoom,
  getRoomByLevel,
} = require("../controllers/room.controller");

router.get("/rooms/:idCompany", showRooms);
router.get("/rooms/:idlevel/:idCompany", getRoomByLevel);
router.post("/rooms", createRoom);
router.put("/rooms/:idroom", updateRoom);

// SCRIPTS

module.exports = router;
