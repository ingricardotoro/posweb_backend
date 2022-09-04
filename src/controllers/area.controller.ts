import { Request, Response } from 'express';
import logger from '../utils/logger';

import { 
    CreateAreaInput,
    ReadAreaInput,
    UpdateAreaInput,
    DeleteAreaInput
} from '../validations/area.schema';

import { 
    createArea,
    deleteArea,
    findAreas,
    findArea,
    updateArea
} from '../services/area.service';

export async function createAreaHandler(req: Request<{}, {}, CreateAreaInput["body"]>, res: Response){
    try {
        
        const areaSave = {
            ...req.body,
            codeArea: `${req.body.nameArea}-${req.body.index}`,
            isActive: true 
        }

        const area = await createArea(areaSave);

        return res.status(201).json({
            ok: true,
            message: 'Area creada exitosamente',
            data: area
        });

    } catch (error : any) {
        logger.error(error);
        return res.status(409).json({
            ok: true,
            message: error.message
        });
    }
}

export async function findAreasHandler(req: Request, res: Response){
    try {
        const areas = await findAreas();
        return res.status(200).json({
            ok: true,
            data: areas
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function findAreaHandler(req: Request<ReadAreaInput['params']>, res: Response){
    try {
        const areaId = req.params.areaId;

        const area = await findArea(areaId);

        if(!area){
            return res.status(404).json({
                ok: false,
                message: 'Area no encontrada'
            });
        }

        return res.status(200).json({
            ok: true,
            data: area
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function updateAreaHandler(
    req: Request<UpdateAreaInput['params']>,
    res: Response
){
    try {
        const areaId = req.params.areaId;
        const area = await findArea(areaId);
        
        if(!area){
            return res.status(404).json({
                ok: false,
                message: 'Area no encontrada'
            });
        }

        await updateArea(areaId, req.body);

        return res.status(200).json({
            ok: true,
            message: 'Area actualizada exitosamente'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}

export async function deleteAreaHandler(
    req: Request<DeleteAreaInput['params']>,
    res: Response 
){
    try {
        const areaId = req.params.areaId;
        const area = await findArea(areaId);

        if(!area){
            return res.status(404).json({
                ok: false,
                message: 'Area no encontrada'
            });
        }

       await deleteArea(area._id);

        return res.status(200).json({
            ok: true, 
            message: 'Area eliminada exitosamente',
            data: area
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}
