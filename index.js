require('dotenv').config()
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 5000
const sequelize = require('./db')
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const MarkUpController = require('./controllersNew/markUpController');
const DiscountController = require('./controllersNew/discountController');
const DiscountCardController = require('./controllersNew/discountCardController')

const app = express()
app.use(cors());
app.use(express.json());
app.use("/static", express.static(__dirname + '/static'));
// const staticPath = path.resolve(__dirname, 'static');
// app.use(express.static(staticPath));
app.use(fileUpload({}))
app.use('/api', router)

//Опрацювання помилок
app.use(errorHandler)
const fs = require('fs');

app.get('/', (req, res) => {
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Помилка сервера.');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(data);
    }
  });
});

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    const markup = await MarkUpController.checkAndCreateDefaultMarkUp()
    const discount = await DiscountController.checkAndCreateDefaultDiscount()
    const discountCard = await DiscountCardController.checkAndCreateDefaultDiscountCard()
    if (!discount) {
      console.error('Сталася помилка при створенні розмітки за замовчуванням')
    }
    if (!discountCard){
      console.error('Сталася помилка при створенні розмітки за замовчуванням')
    }
    if (markup) {
      app.listen(PORT, () => console.log(`My server started on port ${PORT}`))
    } else {
      console.error('Сталася помилка при створенні розмітки за замовчуванням')
    }
  } catch (e) {
    console.log('ПОЛИЛКА!!! EROR!!!!!' + e)
  }
}

start()