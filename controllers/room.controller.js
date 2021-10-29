const Room = require("../models/Room");
const Level = require("../models/Level");
const { getFreeItems } = require("../helpers/GetFreeItems");

exports.showRooms = (req, res) => {
  const company = req.params.idCompany;
  Room.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.getRoomByLevel = async (req, res) => {
  try {
    const { idCompany, idlevel } = req.params;
    const dataLevel = await Level.find({ company: idCompany });
    const dataRoom = await Room.find({ company: idCompany });
    const data = getFreeItems(dataLevel, dataRoom, "rooms", idlevel);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createRoom = (req, res) => {
  const room = new Room(req.body);

  room.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el room",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateRoom = (req, res) => {
  const { idroom } = req.params;
  Room.findById(idroom).exec((err, room) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(room, req.body);

    Room.updateOne({ _id: idroom }, room).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
