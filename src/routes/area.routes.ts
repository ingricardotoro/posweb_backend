import { Router } from 'express';
import validateResource from '../middlewares/validateResource';

//Areas
import { 
    createAreaHandler,
    findAreaHandler,
    findAreasHandler,
    updateAreaHandler,
    deleteAreaHandler
} from '../controllers/area.controller';

import { 
    getAreaSchema,
    createAreaSchema,
    updateAreaSchema,
    deleteAreaSchema
} from '../validations/area.schema';

const router = Router();

// Areas routes
router.get('/api/areas', findAreasHandler);
router.get('/api/areas/:areaId', validateResource(getAreaSchema), findAreaHandler);
router.post('/api/areas', validateResource(createAreaSchema), createAreaHandler);
router.put('/api/areas/:areaId', validateResource(updateAreaSchema), updateAreaHandler);
router.delete('/api/areas/:areaId', validateResource(deleteAreaSchema), deleteAreaHandler);

export default router;