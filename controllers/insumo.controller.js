const Insumo = require("../models/Insumo");

exports.showInsumos = (req, res) => {
  const company = req.params.idCompany;
  Insumo.find({ company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createInsumo = (req, res) => {
  const insumo = new Insumo(req.body);
  insumo.save((err, data) => {
    if (err) return res.status(400).json(err);

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateInsumo = (req, res) => {
  const { idinsumo } = req.params;
  Insumo.findById(idinsumo).exec((err, insumo) => {
    if (err) return res.status(400).json(err);
    Object.assign(insumo, req.body);

    Insumo.updateOne({ _id: idinsumo }, insumo).exec((error, data) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(data);
    });
  });
};

exports.deleteInsumo = (req, res) => {
  const { idinsumo } = req.params;
  Insumo.findById(idinsumo).exec((err, insumo) => {
    if (err) return res.status(400).json(err);

    insumo["status"] = !insumo.status;

    insumo.save((error, data) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(data);
    });
  });
};
