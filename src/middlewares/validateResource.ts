import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schemma: AnyZodObject) => (req:Request, res:Response, next: NextFunction) => {
    try {
        schemma.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (error : any) {
        return res.status(400).send(error.errors);
    }
}

export default validate;