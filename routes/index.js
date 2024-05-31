const Router = require('express');
const router = new Router();

const priceCardsRouter = require('../routesNew/priceCardsRoutes')
const photoGalleryCardsRouter = require('../routesNew/photoGalleryRouter')
const photosForGalleryRouter = require('../routesNew/photosForGalleryRouter')
const markupRouter = require('../routesNew/markUpRouter')
const discountRouter = require('../routesNew/discountRouter')
const discountCardController = require('../routesNew/discountCardRouter')
const userRouter = require('../routesNew/userRouter');
const calendarRouter = require('../routesNew/calendarRouter');

router.use('/priceCards', priceCardsRouter)
router.use('/photoGallery', photoGalleryCardsRouter)
router.use('/photoForGallery', photosForGalleryRouter)
router.use('/markup', markupRouter)
router.use('/discount', discountRouter)
router.use('/discountCard', discountCardController)
router.use('/user', userRouter)
router.use('/calendar', calendarRouter)

const offersRouter = require('./offersRouter');
const clientsRoutes = require('./clientRouter')
const visitsRouter = require('./visitsRouter')

router.use('/offers', offersRouter)
router.use('/clients', clientsRoutes)
router.use('/visit', visitsRouter)

module.exports = router;