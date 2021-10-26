const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const DaySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "schedule",
      required: [true, "schedule is required"],
    },
    monday: {
      type: Boolean,
      default: false,
    },
    tuesday: {
      type: Boolean,
      default: false,
    },
    wednesday: {
      type: Boolean,
      default: false,
    },
    thursday: {
      type: Boolean,
      default: false,
    },
    friday: {
      type: Boolean,
      default: false,
    },
    saturday: {
      type: Boolean,
      default: false,
    },
    sunday: {
      type: Boolean,
      default: false,
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

DaySchema.plugin(uniqueValidator);

module.exports = model("day", DaySchema);
