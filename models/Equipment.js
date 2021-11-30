const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const EquipmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    etiqueta: {
      type: String,
    },
    marca: {
      type: String,
    },
    modelo: {
      type: String,
    },
    serie: {
      type: String,
    },
    type: {
      type: String,
    },
    dates: [
      {
        date: { type: String, default: "" },
        status: { type: Boolean, default: true },
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
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

EquipmentSchema.plugin(uniqueValidator);

module.exports = model("equipment", EquipmentSchema);
