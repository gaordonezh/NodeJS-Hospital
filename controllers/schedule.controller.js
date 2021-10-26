const Schedule = require("../models/Schedule");
const bcrypt = require("bcrypt");

exports.showSchedules = (req, res) => {
  const company = req.params.idCompany;
  Schedule.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createSchedule = (req, res) => {
  const schedule = new Schedule(req.body);

  schedule.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el horario",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateSchedule = (req, res) => {
  const { idschedule } = req.params;
  console.log(idschedule);
  Schedule.findById(idschedule).exec((err, schedule) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(schedule, req.body);

    Schedule.updateOne({ _id: idschedule }, schedule).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
