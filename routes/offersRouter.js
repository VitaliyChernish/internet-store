const Router = require('express');
const router = new Router();
const offersController = require('../controllers/offerController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createOffers', checkRole('ADMIN'), offersController.createOffers);
router.post('/updateOffers', checkRole('ADMIN'), offersController.updateOffer);
router.delete('/delete/:id', checkRole('ADMIN'),  offersController.deleteOffer);
router.get('/getAllOffers', offersController.getAllOffers)
router.get('/choicerouter', offersController.getOneOffers);

module.exports = router;