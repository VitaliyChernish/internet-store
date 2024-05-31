const Router = require('express');
const router = new Router();
const pricecards = require('../controllersNew/priceCardsController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createPriceCard', pricecards.createPriceCard);
router.post('/updatePriceCard',  pricecards.updatePriceCard);
router.delete('/deletePriceCard', pricecards.deletePriceCard);
router.get('/getAllPriceCard', pricecards.getAllPriceCard)
// router.get('/getOnePriceCard/:id', pricecards.getOnePriceCard)

module.exports = router;