const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const LevelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    description: {
      type: String,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "room",
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

LevelSchema.plugin(uniqueValidator);

module.exports = model("level", LevelSchema);
