import { Request, Response } from 'express';
import logger from '../utils/logger';

import { 
   CreateCategoryInput,
   ReadCategoryInput,
   UpdateCategoryInput,
   DeleteCategoryInput
} from '../validations/category.schema';

import { 
    createCategory,
    findCategories,
    findCategory,
    deleteCategory,
    updateCategory
} from '../services/category.service';

export async function createCategoryHandler(req: Request<{}, {}, CreateCategoryInput["body"]>, res: Response){
    try {
        
        const categorySave = {
            ...req.body,
            codeCategory: `${req.body.nameCategory}-${req.body.index}`,
            isActive: true 
        }

        const Category = await createCategory(categorySave);

        return res.status(201).json({
            ok: true,
            message: 'Category creada exitosamente',
            data: Category
        });

    } catch (error : any) {
        logger.error(error);
        return res.status(409).json({
            ok: true,
            message: error.message
        });
    }
}

export async function findCategoriesHandler(req: Request, res: Response){
    try {
        const categories = await findCategories();
        return res.status(200).json({
            ok: true,
            data: categories
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function findCategoryHandler(req: Request<ReadCategoryInput['params']>, res: Response){
    try {
        const categoryId = req.params.categoryId;

        const category = await findCategory(categoryId);

        if(!category){
            return res.status(404).json({
                ok: false,
                message: 'Categoria no encontrada'
            });
        }

        return res.status(200).json({
            ok: true,
            data: category
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });        
    }
}

export async function updateCategoryHandler(
    req: Request<UpdateCategoryInput['params']>,
    res: Response
){
    try {
        const categoryId = req.params.categoryId;
        const category = await findCategory(categoryId);
        
        if(!category){
            return res.status(404).json({
                ok: false,
                message: 'Categoría no encontrada'
            });
        }

        await updateCategory(categoryId, req.body);

        return res.status(200).json({
            ok: true,
            message: 'Categoría actualizada exitosamente'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}

export async function deleteCategoryHandler(
    req: Request<DeleteCategoryInput['params']>,
    res: Response 
){
    try {
        const categoryId = req.params.categoryId;
        const category = await findCategory(categoryId);

        if(!category){
            return res.status(404).json({
                ok: false,
                message: 'Categoría no encontrada'
            });
        }

       await deleteCategory(category._id);

        return res.status(200).json({
            ok: true, 
            message: 'Categoría eliminada exitosamente',
            data: category
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}
