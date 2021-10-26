const Day = require("../models/Day");

exports.showDays = (req, res) => {
  const { idCompany } = req.params;
  Day.find({ company: idCompany })
    .populate("user")
    .populate("schedule")
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

exports.createDay = (req, res) => {
  const day = new Day(req.body);

  day.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el día",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El día ha sido creado con éxito",
    });
  });
};

exports.updateDay = (req, res) => {
  const { idday } = req.params;
  Day.findById(idday).exec((err, day) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(day, req.body);

    Day.updateOne({ _id: idday }, day).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
