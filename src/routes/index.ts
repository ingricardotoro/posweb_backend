import { Router } from 'express';

import area from './area.routes';
import category from './category.routes';
import customer from './customer.routes';
import supplier from './supplier.routes'

const router = Router(); 

router.use(area); 
router.use(category);
router.use(customer); 
router.use(supplier);

export default router; 