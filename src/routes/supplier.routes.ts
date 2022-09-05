import { Router } from 'express';
import validateResource from '../middlewares/validateResource';
import requireUser from '../middlewares/requireUser';

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
router.get('/api/suppliers/:supplierId', [requireUser, validateResource(getSupplierSchema)], findSupplierHandler);
router.post('/api/suppliers', [requireUser, validateResource(createSupplierSchema)], createSupplierHandler);
router.put('/api/suppliers/:supplierId', [requireUser, validateResource(updateSupplierSchema)], updateSupplierHandler);
router.delete('/api/suppliers/:supplierId', [requireUser, validateResource(deleteSupplierSchema)], deleteSupplierHandler);

export default router;