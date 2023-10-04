const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const offersRouter = require('./offersRouter');
const clientsRoutes = require('./clientRouter')
const visitsRouter = require('./visitsRouter')

router.use('/user', userRouter)
router.use('/offers', offersRouter)
router.use('/clients', clientsRoutes)
router.use('/visit', visitsRouter)

module.exports = router;