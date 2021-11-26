const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const MaintenanceSchema = new Schema(
  {
    programmed: {
      type: Boolean,
      default: false,
    },
    date_request: {
      type: String,
    },
    description: {
      type: String,
    },
    date_conformidad: {
      type: String,
    },
    user_solicitante: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    user_autorizacion: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    equipment: {
      type: Schema.Types.ObjectId,
      ref: "equipment",
    },
    diagnostico: {
      type: String,
    },
    tipo_falla: [
      {
        label: { type: String },
        check: { type: Boolean },
      },
    ],
    status_start: {
      type: String,
      enum: [
        "Bueno",
        "Regular",
        "Malo por reparar",
        "Malo por baja",
        "Inoperativo por reparar",
        "Inoperativo por baja",
      ],
    },
    ejecutor_mantenimiento: {
      type: String,
    },
    date_programmed: {
      type: String,
    },
    tipo_mantenimiento: {
      type: String,
      enum: ["Programado", "Imprevisto"],
    },
    tipo_otm: {
      type: String,
      enum: ["Preventivo", "Correctivo"],
    },
    prioridad: {
      type: String,
      enum: ["Muy urgente", "Urgente", "Necesario"],
    },
    tipo_atencion: {
      type: String,
      enum: ["RRHH Propios", "Servicios mano de obra", "Servicio a todo costo"],
    },
    tipo_equipamiento: {
      type: String,
      enum: [
        "Biomédico",
        "Electromecánido",
        "Instalaciones",
        "Infraestructura",
      ],
    },
    actividades_list: [
      {
        type: String,
      },
    ],
    datetime_start: {
      type: String,
    },
    datetime_end: {
      type: String,
    },
    garantia: {
      type: Boolean,
    },
    interrupcion: {
      type: Boolean,
    },
    status_end: {
      type: String,
      enum: [
        "Bueno",
        "Regular",
        "Malo por reparar",
        "Malo por baja",
        "Inoperativo por reparar",
        "Inoperativo por baja",
      ],
    },
    recursos: [
      {
        code: { type: String },
        type: { type: String },
        name: { type: String },
        caract: { type: String },
        und_m: { type: String },
        cant: { type: String },
        vlr_u: { type: String },
        total: { type: String },
      },
    ],
    rrhh: [
      {
        code: { type: String },
        name: { type: String },
        price_hour: { type: String },
        hours: { type: String },
        total: { type: String },
      },
    ],
    aditional: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

MaintenanceSchema.plugin(uniqueValidator);

module.exports = model("maintenance", MaintenanceSchema);
