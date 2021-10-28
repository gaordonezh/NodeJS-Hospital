const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["OCUPADO", "LIBRE"],
    },
    type: {
      type: String,
      enum: ["CIRUGÍA", "ALMACÉN"],
      required: [true, "type is required"],
    },
    beds: [
      {
        type: Schema.Types.ObjectId,
        ref: "bed",
      },
    ],
    equipments: [
      {
        type: Schema.Types.ObjectId,
        ref: "equipment",
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

RoomSchema.plugin(uniqueValidator);

module.exports = model("room", RoomSchema);
