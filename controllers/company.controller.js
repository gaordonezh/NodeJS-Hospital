const Company = require("../models/Company");

exports.createCompany = (req, res) => {
  const company = new Company(req.body);
  company.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "The company could be saved.",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "Auccessfully registered company",
    });
  });
};

exports.showCompanies = (req, res) => {
  Company.find({}).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};
