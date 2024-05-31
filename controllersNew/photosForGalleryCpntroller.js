const { Photo } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class PhotosForGalleryController {

    async addPhotoForGallery(req, res, next) {
        try {
            const { photoGalleryId } = req.body;
            const { addPhoto } = req.files;

            console.log('photoGalleryId!!!!!!!!!!!!!!!!!!!!!!!!!: ' + photoGalleryId);

            const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
            const fileExtension = path.extname(addPhoto.name);
            if (!allowedExtensions.includes(fileExtension)) {
                return next(ApiError.badRequest('Неприпустимий тип файлу'));
            }
            const newFileName = uuid.v4() + fileExtension;
            const uploadPath = path.resolve(__dirname, '..', 'static', newFileName);
            await addPhoto.mv(uploadPath, (err) => {
                if (err) {
                    return next(ApiError.internalServerError('Помилка при завантаженні зображення'));
                }
            });

            await Photo.create({
                filename: newFileName,
                imageUrl: uploadPath,
                photoGalleryId: photoGalleryId // Посилання на галерею
            });
            res.json(addPhoto);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async updatePhotosForGallery(req, res, next) {

        try {
            const { id, filename, description, imageUrl, photoGalleryId } = req.body;
            const photo = await Photo.findOne({ where: { id } });

            const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

            if (req.files) {
                const { newPhoto } = req.files
                const fileExtension = path.extname(newPhoto.name);
                if (!allowedExtensions.includes(fileExtension)) {
                    return next(ApiError.badRequest('Неприпустимий тип файлу'));
                }
                const newFileName = uuid.v4() + fileExtension;
                const uploadPath = path.resolve(__dirname, '..', 'static', newFileName);

                await newPhoto.mv(uploadPath, (err) => {
                    if (err) {
                        return next(ApiError.internalServerError('Помилка при завантаженні зображення'));
                    }
                });

                await photo.update({
                    id: id,
                    filename: newFileName,
                    imageUrl: uploadPath,
                    photoGalleryId: photoGalleryId // Посилання на галерею
                });
            }

            res.json(photo);

        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async deleteOnePhotoForGallery(req, res, next) {
        try {
            const { id } = req.body;
            const photo = await Photo.findOne({ where: { id } });
            if (!photo) {
                return next(ApiError.notFound('photoGallery not found'));
            }

            await photo.destroy();

            res.json({ message: 'photo deleted successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new PhotosForGalleryController();