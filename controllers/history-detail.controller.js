const HistoryDetail = require("../models/HistoryDetail");
const Quote = require("../models/Quote");

exports.showHistoryDetails = (req, res) => {
  const { company, history } = req.params;
  HistoryDetail.find({ history, company })
    .populate([
      { path: "history", model: "history" },
      {
        path: "quote",
        model: "quote",
        populate: { path: "patient", model: "patient" },
      },
    ])
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(data);
    });
};

exports.createHistoryDetail = (req, res) => {
  const historydetail = new HistoryDetail(req.body);
  historydetail.save(async (err, data) => {
    if (err) return res.status(400).json(err);

    await Quote.findByIdAndUpdate(req.body.quote, { status: "PROCESO" });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateHistoryDetail = (req, res) => {
  const { idAttention } = req.params;
  HistoryDetail.findById(idAttention).exec((err, historydetail) => {
    if (err) return res.status(400).json(err);
    Object.assign(historydetail, req.body);

    HistoryDetail.updateOne({ _id: idAttention }, historydetail).exec(
      async (error, data) => {
        if (error) return res.status(400).json(error);
        await Quote.findByIdAndUpdate(req.body.quoteId, {
          status: "FINALIZADO",
        });
        res.status(200).json(data);
      }
    );
  });
};
