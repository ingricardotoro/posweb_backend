import { Router } from 'express';
import validateResource from '../middlewares/validateResource';

//Categories
import { 
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
    findCategoryHandler,
    findCategoriesHandler
} from '../controllers/category.controller';

import { 
    getCategorySchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
} from '../validations/category.schema';

const router = Router();

// Categories routes
router.get('/api/categories', findCategoriesHandler);
router.get('/api/categories/:categoryId', validateResource(getCategorySchema), findCategoryHandler);
router.post('/api/categories', validateResource(createCategorySchema), createCategoryHandler);
router.put('/api/categories/:categoryId', validateResource(updateCategorySchema), updateCategoryHandler);
router.delete('/api/categories/:categoryId', validateResource(deleteCategorySchema), deleteCategoryHandler);

export default router;