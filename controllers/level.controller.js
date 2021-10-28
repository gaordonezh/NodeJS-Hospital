const Level = require("../models/Level");

exports.showLevels = (req, res) => {
  const company = req.params.idCompany;
  Level.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
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
