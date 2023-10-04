const Router = require('express');
const router = new Router();
const visitsController = require('../controllers/visitController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/addVisits', visitsController.addVisits);
router.get('/getVisits', checkRole('ADMIN'), visitsController.getAllVisits);

module.exports = router;