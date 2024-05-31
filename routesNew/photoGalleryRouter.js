const Router = require('express');
const router = new Router();
const photoGallery = require('../controllersNew/photoGalleryController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createPhotoGallery', photoGallery.createPhotoGallery);
router.post('/updatePhotoGallery',  photoGallery.updatePhotoGallery);
router.delete('/deletePhotoGallery', photoGallery.deletePhotoGallery);
router.get('/getAllPhotoGallery', photoGallery.getAllPhotoGallery)
// router.get('/getOnePriceCard/:id', photoGallery.getOnePhotoGallery)

module.exports = router;