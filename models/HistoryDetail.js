const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const HistoryDetailSchema = new Schema(
  {
    date: { type: String, default: "" },
    ult_viaje: { type: String, default: "" },
    // FAMILIARES
    dm: { type: String, default: "" },
    hta: { type: String, default: "" },
    fimicos: { type: String, default: "" },
    lueticos: { type: String, default: "" },
    cancer: { type: String, default: "" },
    otros: { type: String, default: "" },
    patologia: { type: String, default: "" },
    // ANTECEDENTES FAMILIARES
    menarca: { type: String, default: "" },
    rc: { type: String, default: "" },
    upm: { type: String, default: "" },
    menopausia: { type: String, default: "" },
    anticonceptivo: { type: String, default: "" },
    irs: { type: String, default: "" },
    n_parejas: { type: String, default: "" },
    paridad: { type: String, default: "" },
    tipo_parto: { type: String, default: "" },
    pap: { type: String, default: "" },
    colposcopia: { type: String, default: "" },
    mamografia: { type: String, default: "" },
    eco_mama: { type: String, default: "" },
    bi_rads: { type: String, default: "" },
    alergias: { type: String, default: "" },
    antecedentes_quirugicos: { type: String, default: "" },
    // MOTIVO CONSULTA
    motivo: { type: String, default: "" },
    enfermedad_actual: { type: String, default: "" },
    tiempo_enfermedad: { type: String, default: "" },
    // OTHER PART
    pa: { type: String, default: "" },
    fc: { type: String, default: "" },
    fr: { type: String, default: "" },
    sat: { type: String, default: "" },
    t: { type: String, default: "" },
    diuresis: { type: String, default: "" },
    agp: { type: String, default: "" },
    peso: { type: String, default: "" },
    talla: { type: String, default: "" },
    imc: { type: String, default: "" },
    tcsc: { type: String, default: "" },
    piel: { type: String, default: "" },
    ar: { type: String, default: "" },
    cv: { type: String, default: "" },
    neurologico: { type: String, default: "" },
    urinario: { type: String, default: "" },
    mamas: { type: String, default: "" },
    // OTHER
    peritoneales: { type: String, default: "" },
    rha: { type: String, default: "" },
    dolor_localizado: { type: String, default: "" },
    masas: { type: String, default: "" },
    // OTHER
    c_vaginal: { type: String, default: "" },
    cervix: { type: String, default: "" },
    oce: { type: String, default: "" },
    mov: { type: String, default: "" },
    lesiones: { type: String, default: "" },
    tamano: { type: String, default: "" },
    movil: { type: String, default: "" },
    consistencia: { type: String, default: "" },
    dolor: { type: String, default: "" },
    superficie: { type: String, default: "" },
    anexos: { type: String, default: "" },
    // DIAGNOSTICOS
    diagnosticos: { type: String },
    plantratamiento_result: { type: String },
    recomendaciones_result: { type: String },
    // OTHER
    alta_result: { type: String, default: "" },
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
