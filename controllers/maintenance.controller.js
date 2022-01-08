const Maintenance = require("../models/Maintenance");
const Equipment = require("../models/Equipment");
const Insumo = require("../models/Insumo");

exports.showMaintenances = (req, res) => {
  const { idEquiment } = req.params;
  Maintenance.find({ equipment: idEquiment }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.updateDates = (req, res, next) => {
  const { equipment, date } = req.body;
  Equipment.findById(equipment).exec((er, eqp) => {
    if (er) return res.status(400).json(er);
    let finder = eqp.dates.findIndex((row) => row.date === date);
    eqp.dates[finder].status = false;
    delete eqp._id;
    Equipment.updateOne({ _id: equipment }, eqp).exec((error, data) => {
      if (error) return res.status(400).json(error);
      next();
    });
  });
};

exports.updateStock = async (req, res, next) => {
  try {
    const { recursos } = req.body;
    for (let i = 0; i < recursos.length; i++) {
      const { id, cant } = recursos[i];
      const data = await Insumo.findById(id);

      data.stock = data.stock - Number(cant);

      await Insumo.updateOne({ _id: id }, data);
    }

    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createMaintenance = (req, res) => {
  const maintenance = new Maintenance(req.body);
  maintenance.save((err, data) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
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
