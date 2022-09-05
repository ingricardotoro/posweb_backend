import { Router } from 'express';
import validateResource from '../middlewares/validateResource';
import requireUser from '../middlewares/requireUser';

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
router.get('/api/products/:productId', [requireUser, validateResource(getProductSchema)], findProductHandler);
router.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler);
router.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler);
router.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);

export default router;