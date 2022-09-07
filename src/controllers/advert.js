const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const Advert = require("../models/advert");
const ImageTemporary = require("../models/image-temporary");
const User = require("../models/user");
const genericController = require("./generic");
const driveService = require("../services/google-drive");

// card yapısındaki field alanları için kullanıldı
const getCard = async (res, query, next) => {
    try {
        const { list, modelLength, page, pageSize } = await query;
        const cardList = list
            .populate(["address.city", "address.town", "address.district"])
            .select({
                images: { $slice: ["$images", 1] },
                title: 1,
                price: 1,
                address: 1,
                squareMeters: 1,
                type: 1,
                favoriteCount: 1,
                createdAt: 1,
            });

        const data = await cardList.exec();

        return successResponse(res, statusCode.OK, data, {
            currentPage: page || 1,
            totalPage: parseInt(modelLength.length / pageSize, 10) + 1 || 1,
        });
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const advertPost = async (req, res, next) => {
    try {
        const images = await Promise.all(
            req.body.images.map(async (item) => {
                const temporary = await ImageTemporary.findOne({
                    remoteId: item,
                });

                if (!temporary) {
                    return next(
                        new ApiError("Image not defined", statusCode.BAD_REQUEST)
                    );
                }

                await genericController.genericDelete(temporary._id, ImageTemporary);

                return {
                    remoteId: temporary.remoteId,
                    url: temporary.url,
                    name: temporary.name,
                };
            })
        );

        const advert = new Advert({
            ...req.body,
            housing: req.body.housing,
            images,
            user: req.userId,
        });

        await advert.save();

        return successResponse(res, statusCode.OK, advert);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const advertGetById = async (req, res, next) => {
    try {
        const newModel = await genericController.genericGetByQueryPopulate(
            Advert,
            {
                _id: req.params.id,
            },
            [
                "user",
                "address.city",
                "address.town",
                "address.district",
                "interiorFeatures",
                "externalFeatures",
                "locationFeatures",
            ]
        );

        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

// tüm ilanları listeler ve aynı zamanda query bilgisine görede filtreleme yapabilir
const advertGetAll = async (req, res, next) => {
    await getCard(res, genericController.genericQueryOptions(req, Advert), next);
};

// user'ın ilanlarım kısmı
const advertGetByUser = async (req, res, next) => {
    await getCard(
        res,
        genericController.genericQueryOptions(req, Advert, { user: req.userId }),
        next
    );
};
// category path için ilanları listeler
const advertGetByCategory = async (req, res, next) => {
    await getCard(
        res,
        genericController.genericQueryOptions(req, Advert, {
            // eslint-disable-next-line no-useless-escape
            categoryPath: new RegExp(`\^${req.params.path}`),
        }),
        next
    );
};

const advertUpdate = async (req, res, next) => {
    try {
        const advert = await genericController.genericUpdate(
            req.params.id,
            req.body,
            Advert
        );

        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

//FIX:silenen ilanı favoriden çıkar
const advertDelete = async (req, res, next) => {
    try {
        const advert = await genericController.genericDelete(req.params.id, Advert);

        for (const item of advert.images) {
            await driveService.deleteFile(item.remoteId, res);
        }
        return successResponse(res, statusCode.OK, "İlan silindi");
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const addFavorite = async (req, res, next) => {
    try {
        const advert = await Advert.findByIdAndUpdate(req.params.id, {
            $inc: { favoriteCount: 1 },
        });

        await User.findByIdAndUpdate(
            req.userId,
            {
                $push: { favorities: advert._id },
            },
            { new: true }
        );
        successResponse(res, statusCode.OK, "İlan favoriye eklendi");
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const deleteFavorite = async (req, res, next) => {
    try {
        const advert = await Advert.findById(req.params.id);
        advert.favoriteCount -= 1;
        advert.save();
        await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: { favorities: advert._id },
            },
            { new: true }
        );
        successResponse(res, statusCode.OK, "İlan favoriden çıkarıldı");
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

module.exports = {
    advertPost,
    advertGetAll,
    advertGetById,
    advertGetByUser,
    advertGetByCategory,
    advertDelete,
    advertUpdate,
    addFavorite,
    deleteFavorite,
};
