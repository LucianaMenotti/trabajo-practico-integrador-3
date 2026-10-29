import { Schema, model } from "mongoose";

//documento embebido para el perfil del usuario
const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      //minLength define el largo minimo [valor, mensaje]
      maxlength: [50, "El nombre no puede tener más de 50 caracteres"],
      //maxLength define el largo maximo [valor, mensaje]
      match: [
        /^[a-zA-Z\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ],
    },
    lastName: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
      maxlength: [50, "El apellido no puede tener más de 50 caracteres"],
      match: [
        /^[a-zA-Z\s]+$/,
        "El apellido solo puede contener letras y espacios",
      ],
    },
    birthDate: {
      type: Date,
    },
    phone: {
      type: String,
      match: [/^\+?\d{8,15}$/, "El número de teléfono no es válido"],
    },
  },
  { _id: false, versionKey: false },
  // _id: false evita que el perfil reciba su propio id. versionKey: false quita el campo interno __v.
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
      trim: true,
      minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
      maxlength: [
        20,
        "El nombre de usuario no puede tener más de 20 caracteres",
      ],
      match: [
        /^[a-zA-Z0-9]+$/,
        "El username solo puede tener letras y números",
      ],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
      //propiedad que pasa el texto a minúsculas al guardar
      match: [/^\S+@\S+\.\S+$/, "El email no tiene un formato válido"],
      //\S+ es uno o más caracteres que no son espacio, y \. es un punto literal. Exige la forma algo@algo.algo.
    },
    //password guarda el hash, nunca la contraseña real
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "El rol debe ser user o admin",
      },
      default: "user",
    },
    profile: {
      type: profileSchema,
      required: [true, "El perfil es obligatorio"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    //es una propiedad con un objeto. Hace que los campos virtuales aparezcan cuando el dato se convierte a JSON para responder.
    toObject: { virtuals: true },
    //hace lo mismo cuando el dato se convierte a objeto común de JavaScript.
  },
);

//ENTENDER MEJOR!
userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "organizer",
});

export const User = model("User", userSchema);