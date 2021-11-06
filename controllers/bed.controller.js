const Bed = require("../models/Bed");
const Room = require("../models/Room");
const { getFreeItems } = require("../helpers/GetFreeItems");

exports.showBeds = (req, res) => {
  const company = req.params.idCompany;
  Bed.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.getBedsByRoom = async (req, res) => {
  try {
    const { idCompany, idRoom } = req.params;
    const dataRoom = await Room.find({ company: idCompany });
    const dataBed = await Bed.find({ company: idCompany });
    const data = getFreeItems(dataRoom, dataBed, "beds", idRoom);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createBed = (req, res) => {
  const bed = new Bed(req.body);

  bed.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el bed",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateBed = (req, res) => {
  const { idbed } = req.params;
  Bed.findById(idbed).exec((err, bed) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(bed, req.body);

    Bed.updateOne({ _id: idbed }, bed).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
