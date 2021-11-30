const Day = require("../models/Day");
const moment = require("moment");

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

exports.freeDays = (req, res) => {
  const { iddoctor, date } = req.params;
  Day.find({ user: iddoctor })
    .populate("schedule")
    .exec((err, day) => {
      if (err) return res.status(400).json(err);

      let tmp = [];

      day.forEach((r) => {
        if (r.monday) {
          tmp.push({
            day: "LUNES",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .add(1, "days")
              .startOf("week")
              .format("YYYY-MM-DD"),
          });
        }
        if (r.tuesday) {
          tmp.push({
            day: "MARTES",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .startOf("week")
              .add(2, "days")
              .format("YYYY-MM-DD"),
          });
        }
        if (r.wednesday) {
          tmp.push({
            day: "MIERCOLES",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .startOf("week")
              .add(3, "days")
              .format("YYYY-MM-DD"),
          });
        }
        if (r.thursday) {
          tmp.push({
            day: "JUEVES",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .startOf("week")
              .add(4, "days")
              .format("YYYY-MM-DD"),
          });
        }
        if (r.friday) {
          tmp.push({
            day: "VIERNES",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .startOf("week")
              .add(5, "days")
              .format("YYYY-MM-DD"),
          });
        }
        if (r.saturday) {
          tmp.push({
            day: "SABADO",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .startOf("week")
              .add(6, "days")
              .format("YYYY-MM-DD"),
          });
        }
        if (r.sunday) {
          tmp.push({
            day: "DOMINGO",
            start: r.schedule.start,
            end: r.schedule.end,
            ts: moment(date)
              .startOf("week")
              .add(7, "days")
              .format("YYYY-MM-DD"),
          });
        }
      });

      res.status(200).json(tmp);
    });
};
