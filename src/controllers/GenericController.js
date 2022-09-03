const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const ImageTemporary = require("../models/ImageTemporary");

const genericGet = async(req, res, model) => {
    try {
        const newModel = await model.find();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericGetByQuery = async(req, res, model, query) => {
    try {
        const newModel = await model.find(query);
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericGetByQueryPopulate = async(req, res, model, query, populate) => {
    try {
        const newModel = await model.find(query).populate(populate);
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};
//query options middleware den gelen queryler için genel yapı oluşturuldu
const genericQueryOptions = async(req, model) => {
    try {
        console.log("order", req.queryOptions);
        const { pageSize, page, skip } = req.queryOptions.pagination;
        const modelLength = await model.find(req.queryOptions.filtering);
        const list = model
            .find(req.queryOptions.filtering)
            .limit(pageSize)
            .skip(skip)
            .sort(req.queryOptions.sorting.sortQuery);
        return { list, modelLength, page, pageSize };
    } catch (error) {
        return { error };
    }
};
//query options middleware den pagination yapısı kullanıldı. (özel queryler ve parametreler için oluşturuldu.Örneğin kategori path bilgisine göre sorgulamak)
const getByPrivateQueryWithPagination = async(req, query, model) => {
    try {
        const { pageSize, page, skip } = req.queryOptions.pagination;
        const modelLength = await model.find(query);
        const list = model.find(query).limit(pageSize).skip(skip);
        return { list, modelLength, page, pageSize };
    } catch (error) {
        return { error };
    }
};

const genericPost = async(req, res, model) => {
    try {
        const newModel = new model(req.body);
        await newModel.save();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericUpdate = async(id, body, res, model) => {
    try {
        const newModel = await model.findByIdAndUpdate(id, body, {
            new: true,
        });
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericDelete = async(req, res, model) => {
    try {
        await model.findByIdAndRemove(req.params.id);
        successResponse(res, statusCode.OK, "ürün silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = {
    genericDelete,
    genericPost,
    genericUpdate,
    genericGet,
    genericGetByQuery,
    genericGetByQueryPopulate,
    getByPrivateQueryWithPagination,
    genericQueryOptions,
};