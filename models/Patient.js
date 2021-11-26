const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PatientsSchema = new Schema(
  {
    f_name: {
      type: String,
      required: [true, "El f_name es obligatorio"],
    },
    l_name: {
      type: String,
      required: [true, "El l_name es obligatorio"],
    },
    email: {
      type: String,
      default: "",
    },
    ubigeo: {
      address: { type: String, default: "" },
      district: { type: String, default: null },
      province: { type: String, default: null },
      department: { type: String, default: null },
    },
    phone: {
      type: Number,
    },
    t_doc: {
      type: String,
      required: [true, "El tipo de documento es obligatorio"],
    },
    n_doc: {
      type: String,
      required: [true, "El número de documento es obligatorio"],
    },
    date_born: {
      type: String,
    },
    sex: {
      type: String,
    },
    ocupacion: {
      type: String,
    },
    estado_civil: {
      type: String,
    },
    instruccion: {
      type: String,
      default: "",
    },
    l_nacimiento: {
      type: String,
      default: "",
    },
    l_procedencia: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
      required: [true, "Company is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PatientsSchema.plugin(uniqueValidator);

module.exports = model("patient", PatientsSchema);
