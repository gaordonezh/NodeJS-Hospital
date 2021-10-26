const Patient = require("../models/Patient");
const bcrypt = require("bcrypt");

exports.showPatients = (req, res) => {
  const company = req.params.idCompany;
  Patient.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createPatient = (req, res) => {
  const patient = new Patient(req.body);

  patient.save((err, data) => {
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

exports.updatePatient = (req, res) => {
  const { idpatient } = req.params;
  Patient.findById(idpatient).exec((err, patient) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Object.assign(patient, req.body);

    Patient.updateOne({ _id: idpatient }, patient).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};

exports.deletePatient = (req, res) => {
  const idpatient = req.params.idpatient;
  Patient.findById(idpatient).exec((err, patient) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    patient["status"] = !patient.status;

    patient.save((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
