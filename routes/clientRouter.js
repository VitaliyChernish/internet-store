const Router = require('express');
const router = new Router();
const clientData = require('../controllers/clientDataController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createClientData', clientData.createClientData);
router.post('/updateClientData/:id', checkRole('ADMIN'), clientData.updateClientData);
router.delete('/deleteClientData/:id', checkRole('ADMIN'),  clientData.deleteClientData);
router.get('/getAllClientData', checkRole('ADMIN'), clientData.getAllClientData)
router.get('/getOneClientData/:clientPhone', clientData.getOneCustomerOffer)

module.exports = router;