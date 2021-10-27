const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const UserRoutes = require("./routes/user.routes");
const CompanyRoutes = require("./routes/company.routes");
const PatientRoutes = require("./routes/patient.routes");
const ScheduleRoutes = require("./routes/schedule.routes");
const DayRoutes = require("./routes/day.routes");
const QuoteRoutes = require("./routes/quote.routes");

dotenv.config();

class Server {
  constructor() {
    this.puerto = process.env.PORT || 5000;
    this.app = express();
    this.configurarBodyParser();
    this.conectarBD();
    this.rutas();
  }

  iniciarServidor() {
    this.app.listen(this.puerto, () => {
      console.log(`Server running on PORT ${process.env.PORT}`);
    });
  }

  configurarBodyParser() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  rutas() {
    this.app.get("/", (req, res) => {
      res.json("Backend Sistema clínica");
    });

    this.app.use("/api", UserRoutes);
    this.app.use("/api", CompanyRoutes);
    this.app.use("/api", PatientRoutes);
    this.app.use("/api", ScheduleRoutes);
    this.app.use("/api", DayRoutes);
    this.app.use("/api", QuoteRoutes);
  }

  conectarBD() {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // useFindAndModify: false,
      })
      .then((db) => console.log("Db is connect"))
      .catch((error) => console.log(error));
  }
}

module.exports = Server;
