const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const SchudeleSchema = new Schema(
  {
    start: {
      type: String,
      required: [true, "The name is required"],
    },
    end: {
      type: String,
      required: [true, "The image is required"],
    },
    max_x_day: {
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

SchudeleSchema.plugin(uniqueValidator);

module.exports = model("schedule", SchudeleSchema);
