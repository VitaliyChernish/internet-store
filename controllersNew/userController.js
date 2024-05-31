const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');
const multer = require('multer');
const { User, Calendar } = require('../models/models')

const generateJwt = (id, nickName, role) => {
  return jwt.sign(
    { id, nickName, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' })
}

class UserController {

  async getOneUser(req, res, next) {
    try {
      const { id } = req.params
      const user = await User.findOne({ where: { identificator: id } });
      if (user.length === 0) {
        return next(ApiError.notFound('Client not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
      }
      return res.json(user)
    } catch (error) {
      return next(error);
    }
  }

  async registration(req, res, next) {
    const { identificator, date, name, password, company, role, email, instagramm, telegramm, address, phone } = req.body;
    if (!name) {
      return next(ApiError.forbidden(`Бадь ласка, введіть ім'я`));
    }

    try {
      const hashPassword = '111'
      const fileName = 'none'
      const user = await User.create({
        identificator,
        name,
        company,
        password: hashPassword,
        email,
        instagramm,
        telegramm,
        address,
        phone,
        role,
        token: '',
        avatar: fileName
      });

      await user.save();

      const calendar = await Calendar.findOne({where: {date: date}})

      await calendar.update({
        index: 1111,
        date: date,
        isOffered: true,
        identificator, // Використовуємо ідентифікатор користувача зі створеного запису користувача
      })

      return res.json('Реєстрація успішна');
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    const { nickName, password } = req.body;
    try {
      const user = await User.findOne({ where: { nickName } });
      if (!user) {
        return next(ApiError.internal('Користувача з таким ніком не знайдено'));
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal('Невірний пароль'));
      }

      const userName = user.nickName;
      const userRole = user.role;
      const avatar = user.avatar;
      const token = generateJwt(user.id, user.nickName, user.role);
      user.token = token;
      await user.save();
      return res.json({
        token,
        userName,
        userRole,
        avatar,
        message: `Вітаю ${user.nickName}, ви успішно увійшли на сайт як ${user.role}`,
      });
    } catch (error) {
      return next(error);
    }
  }

  async check(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Отримання токену з заголовка Authorization

    if (!token) {
      return next(ApiError.unauthorized('Не надано токен авторизації'));
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Перевірка токену

      const user = await User.findOne({ where: { id: decoded.id } }); // Знайдіть користувача за його ідентифікатором

      if (!user || user.token !== token) {
        return next(ApiError.unauthorized('Недійсний токен авторизації'));
      }

      // Тут ви можете зробити додаткові перевірки, якщо потрібно

      res.json({ message: 'Авторизація пройшла успішно' });
    } catch (error) {
      return next(ApiError.unauthorized('Недійсний токен авторизації'));
    }
  }
}

module.exports = new UserController()