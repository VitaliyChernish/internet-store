const Router = require('express');
const router = new Router();
const MarkUpController = require('../controllersNew/markUpController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.patch('/updateMarkup',  MarkUpController.updateMarkup);
router.get('/getOneMarkup/:id', MarkUpController.getOneMarkup)

module.exports = router;