const { Discount } = require('../models/models')
const ApiError = require('../error/ApiError');

class DiscountController {
    async checkAndCreateDefaultDiscount() {
        try {
            const data = await Discount.findAll({}); // Функція для отримання даних з бази даних
            if (data.length === 0) {
                console.log('not found data');
                // Якщо дані відсутні, створіть їх за замовчуванням
                await Discount.create({
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

    async updateDiscount(req, res, next) {
        try {
            const { index, murkupValue, toggler } = req.body
            const discount = await Discount.findOne({ where: { id: index } });

            await discount.update({
                position: toggler,
                percent: murkupValue,
            })

            return res.json(discount)
        } catch (error) {
            return next(error);
        }
    }
    async getOneDiscount(req, res, next) {
        try {
            const { id } = req.params
            const discount = await Discount.findOne({ where: { id: 1 } });
            if(discount.length === 0){
                return next(ApiError.notFound('Client not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
            }
            return res.json(discount)
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new DiscountController();