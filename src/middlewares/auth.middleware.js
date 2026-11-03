//authMiddleware: verificar el JWT desde las cookies y extraer el usuario.

import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Usuario no autorizado, token no proporcionado" });
    }
    const playload = verifyToken(token);
    req.user = playload;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalido o expirado",
    });
  }
};
