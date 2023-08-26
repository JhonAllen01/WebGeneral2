import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const checkjwt=(req:Request, res:Response, next:NextFunction)=>{

    //extraer el token por el header
    const token=<string>req.headers['token'];

    //status 401 o 403: no permitido, prohibido
    if(!token){
        return res.status(403).json('Acceso no autorizado');
    }

    let payload;
    try {
        payload=jwt.verify(token,'utnKey1234');
        res.locals.payload=payload;
    } catch (error) {
        return res.status(403).json('Acceso no autorizado');
    }

    const {id}=payload;
    const newToken=jwt.sign({id},'utnKey1234',{expiresIn:'5m'});
    res.setHeader('token',newToken);

    next();
    //utnKey1234 es el valor previamente asignado en el controlador
    //next es para que pase al controlador
    
}