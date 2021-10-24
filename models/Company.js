const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    logo: {
      type: String,
      // required: [true, "The image is required"],
      default: "",
    },
    status: {
      type: Boolean,
      required: [true, "The status is required"],
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CompanySchema.plugin(uniqueValidator);

module.exports = model("company", CompanySchema);
