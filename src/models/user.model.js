import {Schema, model} from 'mongoose';

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    //lowercase: true -> convierte el email a minúsculas antes de guardarlo en la base de datos
  },
  password:{
    type: String,
    required: true,
    minlength: 10,
    select: false, // select: false -> no devuelve la contraseña al hacer una consulta
  },
  roles:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  profile:[{
    firstName:{
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName:{
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    birthdate:{
      type: Date,
    },
    phone:{
      type: String,
      trim: true,
    },
  },
],
deleted:{
  type: Date,
  default: null,
},

},
{
  timestamps: true,
  versionKey: false,
},

userSchema.index(
  {username: 1},
  {unique: true, partialFilterExpression: {deleted: false}},
), //username debe ser único, pero solo si el usuario no está eliminado (deleted: false)

userSchema.index(
  {email: 1},
  {unique: true, partialFilterExpression: {deleted: false}},
),//email debe ser único, pero solo si el usuario no está eliminado (deleted: false)
);

userSchema.virtual("Events",{
  ref:"Event",
  localField:"_id",
  foreignField:"user",
});

export const User = model("User", userSchema);