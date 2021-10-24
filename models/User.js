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
      required: [true, "El l_name es obligatorio"],
    },
    email: {
      type: String,
      default: "",
    },
    ubigeo: {
      address: { type: String, default: "" },
      district: { type: String, default: null },
      province: { type: String, default: null },
      department: { type: String, default: null },
    },
    phone: {
      type: Number,
    },
    t_doc: {
      type: String,
      required: [true, "El tipo de documento es obligatorio"],
    },
    n_doc: {
      type: String,
      required: [true, "El número de documento es obligatorio"],
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
    },
    status: {
      type: Boolean,
      default: true,
    },
    rol: {
      type: String,
      enum: ["superadmin", "admin", "rrhh", "logistica", "doctor"],
      required: [true, "El rol es obligatorio"],
    },
    user: {
      type: String,
      required: [true, "El user es obligatoria"],
      unique: [true, "El usuario debe ser único"],
    },
    password: {
      type: String,
      required: [true, "El password es obligatorio"],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
      required: [true, "Company is required"],
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
