const { DiscountCard } = require('../models/models')
const ApiError = require('../error/ApiError');

class DiscountCardController {
    async checkAndCreateDefaultDiscountCard() {
        try {
            const data = await DiscountCard.findAll({}); // Функція для отримання даних з бази даних
            if (data.length === 0) {
                console.log('not found data');
                // Якщо дані відсутні, створіть їх за замовчуванням
                await DiscountCard.create({
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

    async updateDiscountCard(req, res, next) {
        try {
            const { index, murkupValue, toggler } = req.body
            const discountCard = await DiscountCard.findOne({ where: { id: index } });

            await discountCard.update({
                position: toggler,
                percent: murkupValue,
            })

            return res.json(discountCard)
        } catch (error) {
            return next(error);
        }
    }
    async getOneDiscountCard(req, res, next) {
        try {
            const { id } = req.params
            const discountCard = await DiscountCard.findOne({ where: { id: 1 } });
            if(discountCard.length === 0){
                return next(ApiError.notFound('Client not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
            }
            return res.json(discountCard)
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new DiscountCardController();