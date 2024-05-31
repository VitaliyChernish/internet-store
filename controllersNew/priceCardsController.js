const { PriceCards } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class PriceCardsController {
  ////////////////////
  async getAllPriceCard(req, res) {
    const priceCard = await PriceCards.findAll();
    return res.json(priceCard);
  }

  async getOnePriceCard(req, res, next) {
    try {
      const { id } = req.params;
      const priceCard = await PriceCards.findOne({ where: { id } });
      if (!priceCard) {
        return next(ApiError.notFound('priceCard not found'));
      }
      return res.json(priceCard);
    } catch (error) {
      return next(error);
    }
  }

  async createPriceCard(req, res, next) {
    try {
      const { 
        index,
        name,
        description,
        price,
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        moreInfo,
        backgroundBtn,
        styleBack,
        styleFront,
        showDiscountCard,
      } = req.body;

      const priceCard = await PriceCards.create({
        index,
        name,
        description,
        price,
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        moreInfo,
        backgroundBtn,
        styleBack,
        styleFront,
        showDiscountCard,
        image: `fileName`,
      });

      res.json(priceCard);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }



  async updatePriceCard(req, res, next) {
    try {
      const {
        index,
        name,
        description,
        price,
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        moreInfo,
        backgroundBtn,
        styleBack,
        styleFront,
        showDiscountCard,
      } = req.body;

      const priceCard = await PriceCards.findOne({ where: { index } });

      if (!priceCard) {
        return next(ApiError.notFound('priceCard not found'));
      }

      // Оновлення полів оголошення, якщо дані існують
      if (index) {
        priceCard.index = index;
      }
      if (name) {
        priceCard.name = name;
      }
      if (description) {
        priceCard.description = description;
      }
      if (price) {
        priceCard.price = price;
      }
      if (option1) {
        priceCard.option1 = option1
      }
      if (option2) {
        priceCard.option2 = option2;
      }
      if (option3) {
        priceCard.option3 = option3;
      }
      if (option4) {
        priceCard.option4 = option4;
      }
      if (option5) {
        priceCard.option5 = option5;
      }
      if (option6) {
        priceCard.option6 = option6;
      }
      if (moreInfo) {
        priceCard.moreInfo = moreInfo;
      }
      if (backgroundBtn) {
        priceCard.backgroundBtn = backgroundBtn;
      }
      if (styleBack) {
        priceCard.styleBack = styleBack;
      }
      if (styleFront) {
        priceCard.styleFront = styleFront;
      }
      if (description) {
        priceCard.description = description;
      }
      if(showDiscountCard){
        priceCard.showDiscountCard = showDiscountCard
      }

      await priceCard.save();

      res.json(priceCard);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }


  async deletePriceCard(req, res, next) {
    try {
      const { id } = req.body;

      const priceCard = await PriceCards.findOne({ where: { id } });
      if (!priceCard) {
        return next(ApiError.notFound('priceCard not found'));
      }

      await priceCard.destroy();

      res.json({ message: 'priceCard deleted successfully' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new PriceCardsController();