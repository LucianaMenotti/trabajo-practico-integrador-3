//adminMiddleware: verificar que el usuario autenticado sea admin.

export const adminMiddleware = (req, res, next) =>{
    
    if (req.user.role !== "admin"){
        return res.status(403).json({message: "Usuario no autorizado, no es admin"});
    }
    next();
};