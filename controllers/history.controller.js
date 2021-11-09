const History = require("../models/History");

exports.showHistories = (req, res) => {
  const { company } = req.params;
  History.find({ company })
    .populate("patient")
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(data);
    });
};

exports.createHistory = (req, res) => {
  const { patient } = req.body;
  History.findOne({ patient }).exec((error, dataTMP) => {
    if (error) return res.status(400).json(error);
    if (error || dataTMP) return res.status(400).json(error);

    const history = new History(req.body);
    history.save((err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).json({
        data,
        mensaje: "La historia ha sido creado con éxito",
      });
    });
  });
};
