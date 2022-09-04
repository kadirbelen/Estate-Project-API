const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../models/Advert");
const genericController = require("./GenericController");
const ImageTemporary = require("../models/ImageTemporary");
const driveService = require("../services/googleDriveService");
const User = require("../models/User");

const advertPost = async(req, res) => {
    try {
        var images = [];
        for (const item of req.body.images) {
            const temporary = await ImageTemporary.findOne({ remoteId: item });
            if (!temporary) {
                return errorResponse(
                    res,
                    statusCode.BAD_REQUEST,
                    `${item} Image not defined`
                );
            }
            images.push({
                remoteId: temporary.remoteId,
                url: temporary.url,
                name: temporary.name,
            });
            await ImageTemporary.findByIdAndRemove(temporary._id);
        }
        const advert = new Advert({
            ...req.body,
            housing: req.body.housing,
            images: images,
            user: req.userId,
        });
        await advert.save();
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertGetById = async(req, res) => {
    await genericController.genericGetByQueryPopulate(
        req,
        res,
        Advert, {
            _id: req.params.id,
        }, [
            "user",
            "address.city",
            "address.town",
            "address.district",
            "interiorFeatures",
            "externalFeatures",
            "locationFeatures",
        ]
    );
};

//tüm ilanları listeler ve aynı zamanda query bilgisine görede filtreleme yapabilir
const advertGetAll = async(req, res) => {
    await getCard(res, genericController.genericQueryOptions(req, Advert));
};

//user'ın ilanlarım kısmı
const advertGetByUser = async(req, res) => {
    await getCard(
        res,
        genericController.genericQueryOptions(req, Advert, { user: req.userId })
    );
};
//category path için ilanları listeler
const advertGetByCategory = async(req, res) => {
    await getCard(
        res,
        genericController.genericQueryOptions(req, Advert, {
            categoryPath: new RegExp(`\^${req.params.path}`),
        })
    );
};

const advertUpdate = async(req, res) => {
    await genericController.genericUpdate(req.params.id, req.body, res, Advert);
};

const advertDelete = async(req, res) => {
    try {
        const advert = await Advert.findByIdAndRemove(req.params.id);
        if (!advert) {
            return errorResponse(res, statusCode.BAD_REQUEST, "İlan silinemedi");
        }
        for (const item of advert.images) {
            await driveService.deleteFile(item.remoteId, res);
        }
        successResponse(res, statusCode.OK, "İlan silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const addFavorite = async(req, res) => {
    try {
        const advert = await Advert.findById(req.params.id);
        advert.favoriteCount += 1;
        advert.save();
        const user = await User.findByIdAndUpdate(
            req.userId, {
                $push: { favorities: advert._id },
            }, { new: true }
        );
        successResponse(res, statusCode.OK, "İlan favoriye eklendi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const deleteFavorite = async(req, res) => {
    try {
        const advert = await Advert.findById(req.params.id);
        advert.favoriteCount -= 1;
        advert.save();
        const user = await User.findByIdAndUpdate(
            req.userId, {
                $pull: { favorities: advert._id },
            }, { new: true }
        );
        successResponse(res, statusCode.OK, "İlan favoriden çıkarıldı");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

//card yapısındaki field alanları için kullanıldı
const getCard = async(res, query) => {
    try {
        const { list, modelLength, page, pageSize, error } = await query;
        if (error) {
            return errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
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
        successResponse(res, statusCode.OK, data, {
            currentPage: page || 1,
            totalPage: parseInt(modelLength.length / pageSize) + 1 || 1,
        });
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
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