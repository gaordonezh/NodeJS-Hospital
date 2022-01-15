const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    )
      return callback(new Error("Wrong extension type"));

    callback(null, true);
  },
}).single("file");

exports.uploadExcel = (req, res, next) => {
  let exceltojson;

  upload(req, res, function (err) {
    if (err)
      return res.json({
        error_code: 2,
        err_desc: err,
      });

    if (!req.file)
      return res.json({
        error_code: 1,
        err_desc: "No file passed",
      });

    if (
      req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ] === "xlsx"
    ) {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }

    try {
      exceltojson(
        {
          input: req.file.path,
          output: null,
          lowerCaseHeaders: true,
        },
        function (err, result) {
          try {
            fs.unlinkSync(req.file.path);
          } catch (e) {
            //error deleting the file
          }

          if (err)
            return res.status(400).json({
              error_code: 3,
              err_desc: err,
            });

          if (result.length === 0)
            return res
              .status(400)
              .json({ message: "No su pudo cargar el archivo correctamente" });

          req.data = result;
          next();
        }
      );
    } catch (e) {
      res.json({
        error_code: 1,
        err_desc: "Corupted excel file",
      });
    }
  });
};
