const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const HistoryDetailSchema = new Schema(
  {
    date: { type: String },
    ult_viaje: { type: String },
    enfermedad_actual: { type: String },
    tiempo_enfermedad: { type: String },
    sintomas_princ: { type: String },
    relato_cronologico: { type: String },
    funciones_biologicas: { type: String },
    anteced_familiares: { type: String },
    anteced_personls: { type: String },
    pa_result: { type: String },
    pulso_result: { type: String },
    temp_result: { type: String },
    fc_result: { type: String },
    fresp_result: { type: String },
    ecgeneral_result: { type: String },
    odontoestomatologico_result: { type: String },
    diagpresuntivo_result: { type: String },
    diagdefinitivo_result: { type: String },
    plantratamiento_result: { type: String },
    pronostico_result: { type: String },
    recomendaciones_result: { type: String },
    control_evolucion_result: { type: String },
    alta_result: { type: String },
    quote: {
      type: Schema.Types.ObjectId,
      ref: "quote",
      required: [true, "Quote is required"],
    },
    history: {
      type: Schema.Types.ObjectId,
      ref: "history",
      required: [true, "History is required"],
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

HistoryDetailSchema.plugin(uniqueValidator);

module.exports = model("historydetail", HistoryDetailSchema);
