//es el que maneja los errores y no define reglas
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
// isEmpty: devuelve true si no hay errores, false si hay errores
  if (!errors.isEmpty()) {
    const custom = errors.formatWith((err) => {
      //formarwith: formatea los errores de validación en un objeto personalizado
      return `${err.path}: ${err.msg}`;
    });

    return res.status(400).json(custom.array());
  }
  next();
};
