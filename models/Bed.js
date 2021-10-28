const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BedSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    current_patient: {
      type: Schema.Types.ObjectId,
      ref: "patient",
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

BedSchema.plugin(uniqueValidator);

module.exports = model("bed", BedSchema);
