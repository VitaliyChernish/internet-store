const Router = require('express');
const router = new Router();
const userController = require('../controllersNew/userController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.get('/getOneUser/:id', userController.getOneUser)
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check)

module.exports = router;