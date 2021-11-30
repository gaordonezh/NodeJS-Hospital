const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  User.findOne({ user: req.body.user })
    .populate({ path: "company", model: "company" })
    .exec((err, data) => {
      if (err) return res.status(400).json(err);
      if (!data)
        return res
          .status(400)
          .json({ err: "Usuario o contraseña incorrecta." });

      if (!bcrypt.compareSync(req.body.password, data.password)) {
        return res
          .status(400)
          .json({ err: "Usuario o contraseña incorrecta." });
      }

      const token = jwt.sign({ data }, process.env.SECRET, { expiresIn: "7d" });

      res.status(200).json({
        token,
        data,
      });
    });
};

exports.showUsers = (req, res) => {
  const company = req.params.idCompany;
  User.find({ company: company, rol: { $ne: "superadmin" } }).exec(
    (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    }
  );
};

exports.showUsersByRol = (req, res) => {
  const { rol, idCompany } = req.params;
  User.find({ company: idCompany, rol: rol }).exec((err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
};

exports.createUser = (req, res) => {
  const changes = {
    password: bcrypt.hashSync(req.body.password, 10),
  };

  const user = new User(req.body);

  Object.assign(user, changes);
  user.save((err, data) => {
    if (err)
      return res.status(400).json({
        mensaje: "Error al almacenar el  usuario",
        err,
      });

    res.status(200).json({
      data,
      mensaje: "El Usuario ha sido creado con éxito",
    });
  });
};

exports.updateUser = (req, res) => {
  const iduser = req.params.iduser;
  User.findById(iduser).exec((err, user) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Object.assign(user, req.body);

    User.updateOne({ _id: iduser }, user).exec((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};

exports.deleteUser = (req, res) => {
  const iduser = req.params.iduser;
  User.findById(iduser).exec((err, user) => {
    if (err)
      return res.status(400).json({
        mensaje: "error",
        err,
      });
    user["status"] = !user.status;

    user.save((error, data) => {
      if (error)
        return res.status(400).json({
          mensaje: "error",
          error,
        });
      res.status(200).json(data);
    });
  });
};
