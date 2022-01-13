const Building = require("../models/Building");

exports.showBuildings = (req, res) => {
  const company = req.params.idCompany;
  Building.find({ company: company }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.showAllAssigments = (req, res) => {
  const company = req.params.idCompany;
  Building.find({ company: company })
    .populate({
      path: "levels",
      model: "level",
      populate: {
        path: "rooms",
        model: "room",
        populate: [
          {
            path: "beds",
            model: "bed",
          },
          {
            path: "equipments",
            model: "equipment",
          },
        ],
      },
    })
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(data);
    });
};

exports.createBuilding = (req, res) => {
  const building = new Building(req.body);

  building.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar la edificación",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El horario ha sido creado con éxito",
    });
  });
};

exports.updateBuilding = (req, res) => {
  const { idbuilding } = req.params;
  Building.findById(idbuilding).exec((err, building) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    Object.assign(building, req.body);

    Building.updateOne({ _id: idbuilding }, building).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
