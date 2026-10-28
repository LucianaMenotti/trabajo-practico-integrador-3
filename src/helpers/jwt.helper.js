//JWT Helper: funciones para generar y verificar tokens JWT.
import jwt from "jsonwebtoken";

//playload: datos que quiero guardar en el token
//jwt.sign(datos, clave, opciones)

export const generateToken = (playload) => {
  return jwt.sign(playload, process.env.JWT_SECRET, {
    experesIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//jwt.verify(token, clave) -> comprueba que el token sea correcta y no este vencido, si es valido, devuelve los datos (playload). Si no devuelve un error.
