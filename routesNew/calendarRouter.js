const Router = require('express');
const router = new Router();
const CalendarController = require('../controllersNew/calendarController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createCalendar', CalendarController.createCalendar)
router.get('/getAllCalendar', CalendarController.getAllCalendar)
router.patch('/updateCalendar',  CalendarController.updateCalendar);
router.get('/getOneCalendar/:id', CalendarController.getOneCalendar)
router.delete('/deleteCalendarDay', CalendarController.deleteCalendarDay)

module.exports = router;