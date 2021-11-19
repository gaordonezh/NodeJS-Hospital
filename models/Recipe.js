const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const RecipeSchema = new Schema(
  {
    expiration_date: {
      type: String,
      required: [true, "The name is required"],
    },
    emision_date: {
      type: String,
      required: [true, "The image is required"],
    },
    receta: {
      type: String,
    },
    indicaciones: {
      type: String,
    },
    historydetail: {
      type: Schema.Types.ObjectId,
      ref: "historydetail",
      required: [true, "History Detail is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

RecipeSchema.plugin(uniqueValidator);

module.exports = model("recipe", RecipeSchema);
