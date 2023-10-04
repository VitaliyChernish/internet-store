const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');
const multer = require('multer');
const { User } = require('../models/models')

const generateJwt = (id, nickName, role) => {
  return jwt.sign(
    { id, nickName, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' })
}

class UserController {
  async registration(req, res, next) {
    const { nickName, password, company, role, email, instagramm, telegramm, address, phone } = req.body;
      if (!nickName || !password) {
        return next(ApiError.forbidden('Некоректний логін або пароль'));
      }

      if (!req.files || !req.files.file) {
        return next(ApiError.forbidden('Відсутнє зображення'));
      }
    try {
      const image = req.files.file;
      const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
      const fileExtension = path.extname(image.name);

      if (!allowedExtensions.includes(fileExtension)) {
        return next(ApiError.badRequest('Неприпустимий тип файлу'));
      }

      const fileName = uuid.v4() + fileExtension;
      const uploadPath = path.resolve(__dirname, '..', 'static', fileName);

      await image.mv(uploadPath, (err) => {
        if (err) {
          return next(ApiError.internalServerError('Помилка при завантаженні зображення'));
        }
      });

      const candidate = await User.findOne({ where: { nickName } });
      if (candidate) {
        return next(ApiError.badRequest('Користувач з таким nickName вже існує'));
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await User.create({
        nickName,
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

      const token = generateJwt(user.id, user.nickName, user.role);
      user.token = token;
      await user.save();

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