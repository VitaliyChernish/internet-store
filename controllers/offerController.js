const { Offers } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class OffersController {
  ////////////////////
  async getAllOffers(req, res) {
    const offers = await Offers.findAll();
    return res.json(offers);
  }

  async getOneOffers(req, res, next) {
    const { link } = req.query;
    try {
      const decodedLink = decodeURIComponent(link);
      const offers = await Offers.findOne({ where: { link: decodedLink } });
        if (!offers) {
            throw ApiError.notFound('Offers not found');
        }
        return res.json(offers);
    } catch (error) {
        return next(error);
    }
}

  async createOffers(req, res, next) {
    try {
      const { name, link, buyingPrice, oldPrice, newPrice, discontPercent, setTimer, description } = req.body;
      if (!req.files || !req.files.file) {
        return next(ApiError.forbidden('Відсутнє зображення'));
      }
      
      let setDiscontPersent = discontPercent ? discontPercent : Math.round((newPrice - oldPrice) / oldPrice * -100)
      let setDiscontPrice = discontPercent ? Math.round(oldPrice - (oldPrice / 100 * discontPercent)) : newPrice
      let discontSum = oldPrice - newPrice === oldPrice ? oldPrice - setDiscontPrice : oldPrice - newPrice

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

      const offer = await Offers.create({
        name, 
        link, 
        buyingPrice, 
        oldPrice, 
        newPrice, 
        setDiscontPersent,
        setDiscontPrice,
        discontSum,
        setTimer,
        forBought: 0,
        forPromotions: 0,
        forDeliveryReturned: 0,
        others: 0,
        success: 0,
        image: fileName,
        description
      });

      res.json(offer);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }



  async updateOffer(req, res, next) {
    try {
      const { 
        name, 
        link, 
        buyingPrice, 
        oldPrice, 
        newPrice, 
        discontPercent, 
        setTimer,
        forBought,
        forPromotions,
        forDeliveryReturned,
        others,
        success,
        toggle,
        description
       } = req.body;

      const offer = await Offers.findOne({ where: { link } });
      let setDiscontPersent = discontPercent ? discontPercent : Math.round((newPrice - oldPrice) / oldPrice * -100)
      let setDiscontPrice = discontPercent ? Math.round(oldPrice - (oldPrice / 100 * discontPercent)) : newPrice
      let discontSum = oldPrice - newPrice === oldPrice ? oldPrice - setDiscontPrice : oldPrice - newPrice
      
      if (!offer) {
        return next(ApiError.notFound('Offer not found'));
      }

      // Оновлення полів оголошення, якщо дані існують
      if (forPromotions) {
        offer.forPromotions = forPromotions;
      }
      if (forBought) {
        offer.forBought = forBought;
      }
      if (forDeliveryReturned) {
        offer.forDeliveryReturned = forDeliveryReturned;
      }
      if (others) {
        offer.others = others;
      }
      if (success) {
        offer.success = toggle ? offer.success + +success : offer.success - +success;
      }
      if (name) {
        offer.name = name;
      }
      if (link) {
        offer.link = link;
      }
      if (buyingPrice) {
        offer.buyingPrice = buyingPrice;
      }
      if (oldPrice) {
        offer.oldPrice = oldPrice;
      }
      if (newPrice) {
        offer.newPrice = newPrice;
      }
      if (setDiscontPersent) {
        offer.setDiscontPersent = setDiscontPersent;
      }
      if (discontSum) {
        offer.discontSum = discontSum;
      }
      if (setDiscontPrice) {
        offer.setDiscontPrice = setDiscontPrice;
      }
      if (setTimer) {
        offer.setTimer = setTimer;
      }
      if (description) {
        offer.description = description;
      }


      await offer.save();

      res.json(offer);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }


  async deleteOffer(req, res, next) {
    try {
      const { id } = req.params;

      const offer = await Offers.findOne({ where: { id } });
      if (!offer) {
        return next(ApiError.notFound('Offer not found'));
      }

      await offer.destroy();

      res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new OffersController();