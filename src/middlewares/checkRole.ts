import { Request, Response, NextFunction } from "express";

export const checkRole = (roles: Array<string>) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;  

        if(roles.indexOf(user.rol) > -1 ) next();
        else res.status(401).send('Unauthorized');
    };
}