const Maintenance = require("../models/Maintenance");
const Equipment = require("../models/Equipment");

exports.showMaintenances = (req, res) => {
  const { idEquiment } = req.params;
  Maintenance.find({ equipment: idEquiment }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createMaintenance = (req, res) => {
  const maintenance = new Maintenance(req.body);
  const { equipment } = req.body;

  maintenance.save((err, data) => {
    if (err) return res.status(400).json(err);

    Equipment.findById(equipment).exec((er, eqp) => {
      if (er) return res.status(400).json(er);
      let finder = eqp.dates.findIndex((row) => row.date === req.body.date);

      eqp.dates[finder].status = false;
      Object.assign(eqp, req.body);

      Equipment.updateOne({ _id: equipment }, eqp).exec((error, data) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(data);
      });
    });
  });
};

exports.updateMaintenance = (req, res) => {
  const { idMaintenance } = req.params;
  Maintenance.findById(idMaintenance).exec((err, equipment) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(equipment, req.body);

    Maintenance.updateOne({ _id: idMaintenance }, equipment).exec(
      (error, data) => {
        if (error)
          return res.status(400).json({
            mensaje: "error",
            error,
          });
        res.status(200).json(data);
      }
    );
  });
};
