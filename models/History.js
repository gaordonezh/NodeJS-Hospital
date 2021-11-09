const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const HistorySchema = new Schema(
  {
    history_code: {
      type: String,
      required: [true, "The name is required"],
    },
    patient: {
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

HistorySchema.plugin(uniqueValidator);

module.exports = model("history", HistorySchema);
