const { PhotoGallery, Photo } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class PhotoGalleryController {
  ////////////////////

  async getAllPhotoGallery(req, res) {
    try {
      const photoGalleries = await PhotoGallery.findAll({
        include: [Photo] // Включаємо модель Photo у результат
      });
      return res.json(photoGalleries);
    } catch (error) {
      console.error('Помилка при отриманні фотогалерей:', error);
      return res.status(500).json({ message: 'Помилка сервера' });
    }
  }

  async getOnePhotoGallery(req, res, next) {
    try {
      const { id } = req.params;
      const photoGallery = await PhotoGallery.findOne({ where: { id } });
      if (!photoGallery) {
        return next(ApiError.notFound('photoGallery not found'));
      }
      return res.json(photoGallery);
    } catch (error) {
      return next(error);
    }
  }

  async  createPhotoGallery(req, res, next) {
    try {
      const {
        index,
        name,
        description,
        optionDescription,
      } = req.body;
      
      // Отримання фотографій з запиту
      const { photos } = req.files;
  
      // Створення нової галереї
      const photoGallery = await PhotoGallery.create({
        index,
        name,
        description,
        optionDescription,
      });
  
      // Завантаження фотографій до галереї
      await Promise.all(photos.map(async photo => {

        const filename = uuid.v4() + path.extname(photo.name);
        const uploadPath = path.resolve(__dirname, '..', 'static', filename);
  
        await photo.mv(uploadPath);
  
        await Photo.create({
          filename,
          imageUrl: uploadPath,
          photoGalleryId: photoGallery.id // Посилання на галерею
        });
      }));
  
      res.json(photoGallery);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async updatePhotoGallery(req, res, next) {
    
    try {
      const { index, name, description, optionDescription } = req.body;
      const photoGallery = await PhotoGallery.findOne({ where: { index } });

      const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
      const updateFields = { index, name, description, optionDescription };
      const imageFields = [];

      console.log('i server and i trying work well, updateFields: ' +  ' ' + index + ' ' +  name + ' ' + description + ' ' + optionDescription);
      if(req.files){
        
        for (let i = 1; i <= 11; i++) {
          const fileKey = `image${i}`;
          const file = req.files[fileKey];
  
          if (file) {
            const fileExtension = path.extname(file.name);
  
            if (!allowedExtensions.includes(fileExtension)) {
              return next(ApiError.badRequest('Неприпустимий тип файлу'));
            }
  
            const fileName = uuid.v4() + fileExtension;
            const uploadPath = path.resolve(__dirname, '..', 'static', fileName);
  
            await file.mv(uploadPath, (err) => {
              if (err) {
                return next(ApiError.internalServerError('Помилка при завантаженні зображення'));
              }
            });
  
            updateFields[fileKey] = fileName;
            imageFields.push(fileName);
          }
        }
      }

      Object.assign(photoGallery, updateFields);

      await photoGallery.save();
      
      res.json(photoGallery);
      
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deletePhotoGallery(req, res, next) {
    try {
      const { id } = req.body;
      const photoGallery = await PhotoGallery.findOne({ where: { id } });
      if (!photoGallery) {
        return next(ApiError.notFound('photoGallery not found'));
      }

      await photoGallery.destroy();

      res.json({ message: 'photoGallery deleted successfully' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new PhotoGalleryController();