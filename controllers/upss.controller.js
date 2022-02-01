const Upss = require("../models/Upss");
const Room = require("../models/Room");
const { getFreeItems } = require("../helpers/GetFreeItems");

exports.showUpss = (req, res) => {
  const company = req.params.idCompany;
  Upss.find({ company: company })
    .populate({
      path: "rooms",
      model: "room",
      populate: { path: "equipments", model: "equipment" },
    })
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

exports.showUpssByBuilding = async (req, res) => {
  try {
    const { idCompany, idupss } = req.params;
    const dataUpss = await Upss.find({ company: idCompany });
    const dataRooms = await Room.find({ company: idCompany });
    const data = getFreeItems(dataUpss, dataRooms, "rooms", idupss);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createUpss = (req, res) => {
  const upss = new Upss(req.body);

  upss.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar la edificación",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateUpss = (req, res) => {
  const { idupss } = req.params;
  Upss.findById(idupss).exec((err, upss) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(upss, req.body);

    Upss.updateOne({ _id: idupss }, upss).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
