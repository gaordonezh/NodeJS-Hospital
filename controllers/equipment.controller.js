const Equipment = require("../models/Equipment");
const Room = require("../models/Room");
const { getFreeItems } = require("../helpers/GetFreeItems");

exports.showEquipments = (req, res) => {
  const company = req.params.idCompany;
  Equipment.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.getEquipmentsByRoom = async (req, res) => {
  try {
    const { idCompany, idRoom } = req.params;
    const dataRoom = await Room.find({ company: idCompany });
    const dataEquipment = await Equipment.find({ company: idCompany });
    const data = getFreeItems(dataRoom, dataEquipment, "equipments", idRoom);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createEquipment = (req, res) => {
  const equipment = new Equipment(req.body);

  equipment.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el Equipment",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateEquipment = (req, res) => {
  const { idEquipment } = req.params;
  Equipment.findById(idEquipment).exec((err, equipment) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(equipment, req.body);

    Equipment.updateOne({ _id: idEquipment }, equipment).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
