import { Router } from 'express';
import validateResource from '../middlewares/validateResource';
import requireUser from '../middlewares/requireUser';

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
router.post('/api/areas', [requireUser, validateResource(createAreaSchema)], createAreaHandler);
router.put('/api/areas/:areaId', [requireUser, validateResource(updateAreaSchema)], updateAreaHandler);
router.delete('/api/areas/:areaId', [requireUser, validateResource(deleteAreaSchema)], deleteAreaHandler);

export default router;