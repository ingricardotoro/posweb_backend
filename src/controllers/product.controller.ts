import { Request, Response } from 'express';
import logger from '../utils/logger';

import { 
   CreateProductInput,
   ReadProductInput,
   UpdateProductInput,
   DeleteProductInput
} from '../validations/product.schema';

import { 
    createProduct,
    updateProduct,
    deleteProduct,
    findProduct,
    findProducts
} from '../services/product.service';

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response){
    try {
        
        const productSave = {
            ...req.body,
            codeProduct: `${req.body.name}-${req.body.brand}`,
            isActive: true 
        }

        const Product = await createProduct(productSave);

        return res.status(201).json({
            ok: true,
            message: 'Producto creado exitosamente',
            data: Product
        });

    } catch (error : any) {
        logger.error(error);
        return res.status(409).json({
            ok: true,
            message: error.message
        });
    }
}

export async function findProductsHandler(req: Request, res: Response){
    try {
        const products = await findProducts();
        return res.status(200).json({
            ok: true,
            data: products
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function findProductHandler(req: Request<ReadProductInput['params']>, res: Response){
    try {
        const productId = req.params.productId;

        const product = await findProduct(productId);

        if(!product){
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            ok: true,
            data: product
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function updateProductHandler(
    req: Request<UpdateProductInput['params']>,
    res: Response
){
    try {
        const productId = req.params.productId;
        const product = await findProduct(productId);
        
        if(!product){
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        await updateProduct(productId, req.body);

        return res.status(200).json({
            ok: true,
            message: 'Producto actualizado exitosamente'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}

export async function deleteProductHandler(
    req: Request<DeleteProductInput['params']>,
    res: Response 
){
    try {
        const productId = req.params.productId;
        const product = await findProduct(productId);

        if(!product){
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

       await deleteProduct(product._id);

        return res.status(200).json({
            ok: true, 
            message: 'Producto eliminado exitosamente',
            data: product
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}
