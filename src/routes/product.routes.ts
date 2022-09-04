import { Router } from 'express';
import validateResource from '../middlewares/validateResource';

//Products
import { 
    createProductHandler,
    findProductHandler,
    findProductsHandler,
    updateProductHandler,
    deleteProductHandler
} from '../controllers/product.controller';

import { 
    getProductSchema,
    createProductSchema,
    updateProductSchema,
    deleteProductSchema
} from '../validations/product.schema';

const router = Router();

// Products routes
router.get('/api/products', findProductsHandler);
router.get('/api/products/:productId', validateResource(getProductSchema), findProductHandler);
router.post('/api/products', validateResource(createProductSchema), createProductHandler);
router.put('/api/products/:productId', validateResource(updateProductSchema), updateProductHandler);
router.delete('/api/products/:productId', validateResource(deleteProductSchema), deleteProductHandler);

export default router;