import { Router } from 'express';

import area from './area.routes';
import category from './category.routes';
import customer from './customer.routes';
import supplier from './supplier.routes';
import auth from './auth.routes';

const router = Router(); 

router.use(auth);
router.use(area); 
router.use(category);
router.use(customer); 
router.use(supplier);

export default router; 