import * as express from 'express';
import {{toCamelCase name}}sController from '../controllers/{{toCamelCase name}}s.controller';

const router = express.Router();

router.get('/', {{toCamelCase name}}sController.getAll);
router.get('/:id', {{toCamelCase name}}sController.getById);
router.post('/', {{toCamelCase name}}sController.create);
router.put('/:id', {{toCamelCase name}}sController.updateById);
router.delete('/:id', {{toCamelCase name}}sController.deleteById);

// Export the router
export = router;
