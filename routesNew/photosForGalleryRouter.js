const Router = require('express');
const router = new Router();
const photoForGallery = require('../controllersNew/photosForGalleryCpntroller');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/updatePhotosForGallery',  photoForGallery.updatePhotosForGallery);
router.post('/addPhotoForGallery', photoForGallery.addPhotoForGallery)
router.delete('/deleteOnePhotoForGallery', photoForGallery.deleteOnePhotoForGallery)

module.exports = router;