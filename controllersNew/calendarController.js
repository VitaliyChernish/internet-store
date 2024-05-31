const { Calendar } = require('../models/models')
const ApiError = require('../error/ApiError');

class CalendarController {

    async createCalendar(req, res, next) {
        const { date, isOffered, isAvailable, time, description } = req.body;
        try {
            const calendar = await Calendar.create({
                date,
                isOffered,
                isAvailable,
                time,
                description
            });
            await calendar.save()

            return res.json('Календар оновлений');
        } catch (error) {
            return res.status(500).json({ message: 'Помилка сервера' })
        }
    }

    async getAllCalendar(req, res, next) {
        try {
            const calendar = await Calendar.findAll();
            return res.json(calendar)
        } catch (error) {
            return res.status(500).json({ message: 'Помилка сервера' })
        }
    }

    async updateCalendar(req, res, next) {
        try {
            const { index, murkupValue, toggler } = req.body
            const calendar = await Calendar.findOne({ where: { id: index } });

            await calendar.update({
                position: toggler,
                percent: murkupValue,
            })

            return res.json(calendar)
        } catch (error) {
            return next(error);
        }
    }
    async getOneCalendar(req, res, next) {
        try {
            const { id } = req.params
            const calendar = await Calendar.findOne({ where: { id: 1 } });
            if (calendar.length === 0) {
                return next(ApiError.notFound('Client not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
            }
            return res.json(calendar)
        } catch (error) {
            return next(error);
        }
    }

    async deleteCalendarDay(req, res, next) {
        try {
            const { date } = req.body;

            console.log('!!!!!!!!!!!!!!!!!!!!!!!!: ' + date);

            const calendarDay = await Calendar.findOne({ where: { date: date } });
            if (!calendarDay) {
              return next(ApiError.notFound('calendarDay not found'));
            }
      
            await calendarDay.destroy();
      
            res.json({ message: 'calendarDay deleted successfully' });
          } catch (error) {
            next(ApiError.badRequest(error.message));
          }
    }
}

module.exports = new CalendarController();