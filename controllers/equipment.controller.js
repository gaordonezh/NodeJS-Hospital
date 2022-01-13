const Equipment = require("../models/Equipment");
const Room = require("../models/Room");
const { getFreeItems } = require("../helpers/GetFreeItems");

exports.showEquipments = async (req, res) => {
  try {
    const { idCompany } = req.params;
    const data = await Equipment.find({ company: idCompany });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.showMaintenancesByDates = async (req, res) => {
  try {
    const { company } = req.params;
    const data = await Equipment.find({ company });

    let allDates = [];
    data.forEach((m) => {
      m.dates.forEach((d) => {
        if (!allDates.includes(d.date) && d.status) allDates.push(d.date);
      });
    });

    let newData = [];
    data.forEach((m) => {
      m.dates.forEach((d) => {
        if (allDates.includes(d.date)) {
          newData.push({ ...m._doc, date: d.date });
        }
      });
    });

    let reOrder = newData.sort((a, b) => (a.date > b.date ? 1 : -1));

    res.status(200).json(reOrder);
    // console.log(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.showEquipmentById = async (req, res) => {
  try {
    const { equipment } = req.params;
    const data = await Equipment.findById(equipment);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
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
