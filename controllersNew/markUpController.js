const { MarkUp } = require('../models/models')
const ApiError = require('../error/ApiError');

class MarkUpController {
    async checkAndCreateDefaultMarkUp() {
        try {
            const data = await MarkUp.findAll({}); // Функція для отримання даних з бази даних
            if (data.length === 0) {
                console.log('not found data');
                // Якщо дані відсутні, створіть їх за замовчуванням
                await MarkUp.create({
                    index: 1,
                    position: 0,
                    percent: 0,
                }); // Функція для створення даних за замовчуванням
                console.log('Створено дані за замовчуванням');
                return 'success';
            } else {
                console.log('Дані вже існують');
                return 'data_exists'; // Повертаємо 'data_exists', якщо дані вже існують
            }
        } catch (error) {
            console.error('Помилка при перевірці або створенні даних за замовчуванням:', error);
        }
    }

    async updateMarkup(req, res, next) {
        try {
            const { index, murkupValue, toggler } = req.body
            const markUp = await MarkUp.findOne({ where: { id: index } });

            await markUp.update({
                position: toggler,
                percent: murkupValue,
            })

            return res.json(markUp)
        } catch (error) {
            return next(error);
        }
    }
    async getOneMarkup(req, res, next) {
        try {
            const { id } = req.params
            const markUp = await MarkUp.findOne({ where: { id: 1 } });
            if(markUp.length === 0){
                return next(ApiError.notFound('Client not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
            }
            return res.json(markUp)
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new MarkUpController();