const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const InsumoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    description: {
      type: String,
    },
    u_medida: {
      type: String,
    },
    marca: {
      type: String,
    },
    precio: {
      type: Number,
    },
    stock: {
      type: Number,
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

InsumoSchema.plugin(uniqueValidator);

module.exports = model("insumo", InsumoSchema);
