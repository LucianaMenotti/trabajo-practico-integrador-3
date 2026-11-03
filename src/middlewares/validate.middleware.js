//es el que maneja los errores y no define reglas
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const custom = errors.formatWith((err) => {
      return `${err.path}: ${err.msg}`;
    });

    return res.status(400).json(custom.array());
  }
  next();
};
