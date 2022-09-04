import { Router } from 'express';
import validateResource from '../middlewares/validateResource';

//Customers
import { 
    createCustomerHandler,
    findCustomerHandler,
    findCustomersHandler,
    updateCustomerHandler,
    deleteCustomerHandler
} from '../controllers/customer.controller';

import { 
    getCustomerSchema,
    createCustomerSchema,
    updateCustomerSchema,
    deleteCustomerSchema
} from '../validations/customer.schema';

const router = Router();

// Customer routes
router.get('/api/customers', findCustomersHandler);
router.get('/api/customers/:customerId', validateResource(getCustomerSchema), findCustomerHandler);
router.post('/api/customers', validateResource(createCustomerSchema), createCustomerHandler);
router.put('/api/customers/:customerId', validateResource(updateCustomerSchema), updateCustomerHandler);
router.delete('/api/customers/:customerId', validateResource(deleteCustomerSchema), deleteCustomerHandler);

export default router;