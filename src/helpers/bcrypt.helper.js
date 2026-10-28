//Bcrypt Helper: funciones para hashear y comparar contraseñas.

import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10); // 10 es el número de rondas
};
// bcrypt.hash(texto, 10) -> metodo que devuelve el hash del texto

export const comparePassword = async (password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword);
}
// bcrypt.compare(texto, hash) -> metodo que compara un texto con un hash y devuelve true o false