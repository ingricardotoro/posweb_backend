import { Request, Response } from 'express';
import logger from '../utils/logger';

import { 
   CreateSupplierInput,
   ReadSupplierInput,
   UpdateSupplierInput,
   DeleteSupplierInput
} from '../validations/supplier.schema';

import { 
    createSupplier,
    updateSupplier,
    deleteSupplier,
    findSupplier,
    findSuppliers
} from '../services/supplier.service';

import { createPerson } from '../services/person.service';

export async function createSupplierHandler(req: Request<{}, {}, CreateSupplierInput["body"]>, res: Response){
    try {
        const { 
            identidad, 
            name, 
            lastName, 
            rtn, 
            gender, 
            birth, 
            email, 
            phone1, 
            phone2, 
            location,
            country,
            city,
            website,
            facebook,
            twitter,
            linkedin,
            companyName,
            companyLocation,
            companyLogo,
            companyPhone1,
            companyPhone2,
            companyRtn,
            workPosition,
            title
        } = req.body; 

        const personSave = {
            identidad, 
            name, 
            lastName, 
            rtn, 
            gender, 
            birth, 
            email, 
            phone1, 
            phone2, 
            location,
            country,
            city,
            website,
            facebook,
            twitter,
            linkedin,
            isActive: true
        }

        const person = await createPerson(personSave);
        
        const supplierSave = {
            person: person._id,
            codeSupplier: `${req.body.companyRtn}_${req.body.companyName}`,
            companyName,
            companyRtn,
            companyLocation,
            companyLogo,
            companyPhone1,
            companyPhone2,
            workPosition,
            title,
            isActive: true 
        }

        const supplier = await createSupplier(supplierSave);

        return res.status(201).json({
            ok: true,
            message: 'Proveedor creado exitosamente',
            data: supplier
        });

    } catch (error : any) {
        logger.error(error);
        return res.status(409).json({
            ok: true,
            message: error.message
        });
    }
}

export async function findSuppliersHandler(req: Request, res: Response){
    try {
        const suppliers = await findSuppliers();
        return res.status(200).json({
            ok: true,
            data: suppliers
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function findSupplierHandler(req: Request<ReadSupplierInput['params']>, res: Response){
    try {
        const supplierId = req.params.supplierId;

        const supplier = await findSupplier(supplierId);

        if(!supplier){
            return res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'
            });
        }

        return res.status(200).json({
            ok: true,
            data: supplier
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function updateSupplierHandler(
    req: Request<UpdateSupplierInput['params']>,
    res: Response
){
    try {
        const supplierId = req.params.supplierId;
        const supplier = await findSupplier(supplierId);
        
        if(!supplier){
            return res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'
            });
        }

        await updateSupplier(supplierId, req.body);

        return res.status(200).json({
            ok: true,
            message: 'Proveedor actualizado exitosamente'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}

export async function deleteSupplierHandler(
    req: Request<DeleteSupplierInput['params']>,
    res: Response 
){
    try {
        const supplierId = req.params.supplierId;
        const supplier = await findSupplier(supplierId);

        if(!supplier){
            return res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'
            });
        }

       await deleteSupplier(supplier._id);

        return res.status(200).json({
            ok: true, 
            message: 'Proveedor eliminado exitosamente',
            data: supplier
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}
