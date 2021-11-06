const Maintenance = require("../models/Maintenance");

exports.showMaintenances = (req, res) => {
  const { idEquiment } = req.params;
  Maintenance.find({ equipment: idEquiment }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createMaintenance = (req, res) => {
  const equipment = new Maintenance(req.body);

  equipment.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el Maintenance",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
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
