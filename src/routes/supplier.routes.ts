import { Router } from 'express';
import validateResource from '../middlewares/validateResource';

//Supplier
import { 
    createSupplierHandler,
    findSupplierHandler,
    findSuppliersHandler,
    updateSupplierHandler,
    deleteSupplierHandler
} from '../controllers/supplier.controller';

import { 
    getSupplierSchema,
    createSupplierSchema,
    updateSupplierSchema,
    deleteSupplierSchema
} from '../validations/supplier.schema';

const router = Router();

// Customer routes
router.get('/api/suppliers', findSuppliersHandler);
router.get('/api/suppliers/:supplierId', validateResource(getSupplierSchema), findSupplierHandler);
router.post('/api/suppliers', validateResource(createSupplierSchema), createSupplierHandler);
router.put('/api/suppliers/:supplierId', validateResource(updateSupplierSchema), updateSupplierHandler);
router.delete('/api/suppliers/:supplierId', validateResource(deleteSupplierSchema), deleteSupplierHandler);

export default router;