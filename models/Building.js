const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BuildingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    description: {
      type: String,
    },
    levels: [
      {
        type: Schema.Types.ObjectId,
        ref: "level",
      },
    ],
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

BuildingSchema.plugin(uniqueValidator);

module.exports = model("building", BuildingSchema);
