//ownerOrAdminMiddleware: verificar que el usuario sea el organizador del evento o sea admin.

import {EventModel} from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
    try {
        //verificar que el usuarip esta autenticado
        if(!req.user){
            return res.status(401).json({
                message: "usuario no autenticado",
            });
        }

        //verificar el rol del usuario
        const {user_id, role} = req.user;
        //Por qué va entre llaves user_id y role? Porque req.user es un objeto que contiene varias propiedades, y estamos usando la desestructuración para extraer solo las propiedades user_id y role de ese objeto. Esto nos permite acceder a esas propiedades directamente sin tener que escribir req.user.user_id y req.user.role cada vez.

        if (role !== "admin" && role !== "user"){
            return res.status(403).json({
                message:"usuario no autorizado, no es admin ni user",
            });
        }

        //verificar que llegue el ID  del evento
        const eventID = req.params.id ?? req.body.article_id;
        if (!eventID) {
            return res.status(400).json({
                message: "ID del evento no proporcionado",
            });
        }

        //verificar que exista el evento
        const existEvent = await EventModel.findOne({_id:eventID});
        // Por qué usamos findOne? Porque findOne nos permite buscar un solo documento en la base de datos que cumpla con la condición que le pasamos. En este caso, estamos buscando un evento cuyo _id sea igual al eventID que recibimos en la solicitud. Si existe, existEvent contendrá ese documento; si no, será null.

        if (!existEvent) {
            return res.status(404).json({
                message:"evento no encontrado"
            });
        }

        //verificar que sea admin o el organizador del evento
        if(role !== "admin" && String(existEvent.organizer) !== String(user_id)){
            return res.status(403).json({
                message:"usuario no autorizado, no es admin ni organizador del evento"
            });

            //Por qué usamos String() para comparar los IDs? Porque en MongoDB, los IDs se almacenan como objetos ObjectId, y cuando los obtenemos de la base de datos, no son simples cadenas de texto. Para compararlos correctamente, los convertimos a cadenas de texto usando String(). Esto asegura que la comparación sea precisa y no falle debido a diferencias de tipo.
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message:"error interno del servidor", error});
    }
};
