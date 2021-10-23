const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    f_name: {
      type: String,
      required: [true, "El f_name es obligatorio"],
    },
    l_name: {
      type: String,
      // required: [true, "El l_name es obligatorio"],
    },
    user: {
      type: String,
      required: [true, "El user es obligatoria"],
      unique: [true, "El usuario debe ser único"],
    },
    code: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      // required: [true, "El email es obligatorio"],
      // unique: [true, "El email debe ser único"],
    },
    address: {
      type: String,
      // required: [true, "El address es obligatorio"],
    },
    phone: {
      type: Number,
      required: [true, "El celular es obligatorio"],
    },
    password: {
      type: String,
      required: [true, "El password es obligatorio"],
    },
    t_doc: {
      type: String,
      enum: ["DNI", "PTP", "PASSPORT", "CNT_EXT", "RUC"],
      required: [true, "El tipo de documento es obligatorio"],
      default: "DNI",
    },
    n_doc: {
      type: String,
      // required: [true, "El número de documento es obligatorio"],
      // unique: [true, "El usuario debe ser único"],
    },
    profile_picture: {
      type: String,
      default: "",
    },
    date_born: {
      type: String,
    },
    type_sex: {
      type: String,
      // enum: ["M", "F", "OTRO"],
      // default: "M",
    },
    status: {
      type: Boolean,
      default: true,
    },
    rol: {
      type: String,
      enum: [
        "superadmin",
        "admin",
        "transportista",
        "cajero",
        "vendedor",
        "supervisor",
        "jefetienda",
        "horizontal",
        "inventario",
        "rrhh",
      ],
      required: [true, "El rol es obligatorio"],
      default: "vendedor",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
      required: [true, "Company is required"],
    },
    route: {
      type: Schema.Types.ObjectId,
      ref: "route",
    },
    reset_password_token: {
      type: String,
    },
    reset_password_expires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  let user = this;
  let useObject = user.toObject();
  delete useObject.password;
  delete useObject.user;

  return useObject;
};

UserSchema.plugin(uniqueValidator);

module.exports = model("user", UserSchema);
