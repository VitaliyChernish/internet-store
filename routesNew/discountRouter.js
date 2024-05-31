const Router = require('express');
const router = new Router();
const DiscountController = require('../controllersNew/discountController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.patch('/updateDiscount',  DiscountController.updateDiscount);
router.get('/getOneDiscount/:id', DiscountController.getOneDiscount)

module.exports = router;