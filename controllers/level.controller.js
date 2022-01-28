const Level = require("../models/Level");
const Building = require("../models/Building");
const { getFreeItems } = require("../helpers/GetFreeItems");

exports.showLevels = (req, res) => {
  const company = req.params.idCompany;
  Level.find({ company: company })
    .populate({ path: "rooms", model: "room" })
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

exports.showLevelsByBuilding = async (req, res) => {
  try {
    const { idCompany, idBuilding } = req.params;
    const dataBuilding = await Building.find({ company: idCompany });
    const dataLevel = await Level.find({ company: idCompany });
    const data = getFreeItems(dataBuilding, dataLevel, "levels", idBuilding);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createLevel = (req, res) => {
  const level = new Level(req.body);

  level.save((err, data) => {
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

exports.updateLevel = (req, res) => {
  const { idlevel } = req.params;
  Level.findById(idlevel).exec((err, level) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(level, req.body);

    Level.updateOne({ _id: idlevel }, level).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
