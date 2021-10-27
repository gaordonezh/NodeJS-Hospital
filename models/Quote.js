const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const QuoteSchema = new Schema(
  {
    start: {
      type: String,
      required: [true, "The name is required"],
    },
    end: {
      type: String,
      required: [true, "The image is required"],
    },
    urgency: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDIENTE", "PROCESO", "FINALIZADO", "AUSENTE", "CANCELADO"],
      default: "PENDIENTE",
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "patient",
      required: [true, "patient is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
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

QuoteSchema.plugin(uniqueValidator);

module.exports = model("quote", QuoteSchema);
