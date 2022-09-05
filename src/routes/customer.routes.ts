import { Router } from 'express';
import validateResource from '../middlewares/validateResource';
import requireUser from '../middlewares/requireUser';

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
router.get('/api/customers/:customerId', [requireUser, validateResource(getCustomerSchema)], findCustomerHandler);
router.post('/api/customers', [requireUser, validateResource(createCustomerSchema)], createCustomerHandler);
router.put('/api/customers/:customerId', [requireUser, validateResource(updateCustomerSchema)], updateCustomerHandler);
router.delete('/api/customers/:customerId', [requireUser, validateResource(deleteCustomerSchema)], deleteCustomerHandler);

export default router;