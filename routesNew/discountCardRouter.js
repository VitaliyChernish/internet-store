const Router = require('express');
const router = new Router();
const DiscountCardController = require('../controllersNew/discountCardController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.patch('/updateDiscountCard',  DiscountCardController.updateDiscountCard);
router.get('/getOneDiscountCard/:id', DiscountCardController.getOneDiscountCard)

module.exports = router;