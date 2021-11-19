const Recipe = require("../models/Recipe");
const Quote = require("../models/Quote");
const Patient = require("../models/Patient");
const User = require("../models/User");

exports.showRecipes = (req, res) => {
  const { detail } = req.params;
  Recipe.find({ historydetail: detail }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createRecipe = (req, res) => {
  const recipe = new Recipe(req.body);

  recipe.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el recipe",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateRecipe = (req, res) => {
  const { idrecipe } = req.params;
  Recipe.findById(idrecipe).exec((err, recipe) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(recipe, req.body);

    Recipe.updateOne({ _id: idrecipe }, recipe).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};

exports.showDashboard = async (req, res) => {
  try {
    const { company } = req.params;
    const quotes = await Quote.find({ company }).populate("patient");
    const patients = await Patient.find({ company });
    const services = await User.find({ company, rol: "rrhh" });
    const logistica = await User.find({ company, rol: "logistica" });
    const medicos = await User.find({ company, rol: "doctor" });

    res.status(200).json({
      quotes: quotes.length,
      patients: patients.length,
      services: services.length,
      logistica: logistica.length,
      medicos: medicos.length,
      list: quotes,
    });
  } catch (error) {
    res.status(400).json(err);
  }
};
