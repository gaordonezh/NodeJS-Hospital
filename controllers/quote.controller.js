const Quote = require("../models/Quote");
const Day = require("../models/Day");

exports.showQuotes = (req, res) => {
  const company = req.params.idCompany;
  Quote.find({ company: company })
    .populate([
      { model: "patient", path: "patient" },
      { model: "user", path: "user" },
    ])
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

exports.showQuotesByUser = (req, res) => {
  const { patient } = req.params;
  Quote.find({ patient, status: "PENDIENTE" })
    .populate([
      { model: "patient", path: "patient" },
      { model: "user", path: "user" },
    ])
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

exports.showFreeQuotes = async (req, res) => {
  try {
    const { idCompany } = req.params;
    // const quotes = await Quote.find({ company: idCompany });
    const days = await Day.find({ company: idCompany }).populate("schedule");

    res.status(200).json({ days });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createQuote = (req, res) => {
  const quote = new Quote(req.body);

  quote.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el paciente",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El paciente ha sido creado con éxito",
    });
  });
};

exports.updateQuote = (req, res) => {
  const { idquote } = req.params;
  Quote.findById(idquote).exec((err, quote) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });

    Object.assign(quote, req.body);

    Quote.updateOne({ _id: idquote }, quote).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
