const statusCode = require("http-status-codes").StatusCodes;
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");

// sorgulama ihtiyacı duyulmayan veriler için (iç-dış özellik // illeri getirmek)
const genericGet = async(res, Model) => {
    try {
        const newModel = await Model.find();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

// karmaşık olmayan sorgular için(ile göre ilçe getirme--)
const genericGetByQuery = async(res, Model, query) => {
    try {
        const newModel = await Model.find(query);
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

// ilan detayı gibi liste(array) olmayan ancak populate kullanılacak sorgular için
const genericGetByQueryPopulate = async(res, Model, query, populate) => {
    try {
        const newModel = await Model.find(query).populate(populate);
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};
// middleware üzerinden gelen query bilgilerine göre sorgulama yapar
const genericQueryOptions = async(req, Model, query) => {
    try {
        if (query) {
            req.queryOptions.filtering = {...req.queryOptions.filtering, ...query };
        }
        console.log("query", req.queryOptions.sorting);
        const { pageSize, page, skip } = req.queryOptions.pagination;
        const modelLength = await Model.find(req.queryOptions.filtering);
        const list = Model.find(req.queryOptions.filtering)
            .limit(pageSize)
            .skip(skip)
            .sort(req.queryOptions.sorting);
        return { list, modelLength, page, pageSize };
    } catch (error) {
        return { error };
    }
};

const genericPost = async(req, res, Model) => {
    try {
        const newModel = new Model(req.body);
        await newModel.save();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericUpdate = async(id, body, res, Model) => {
    try {
        const newModel = await Model.findByIdAndUpdate(id, body, {
            new: true,
        });
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericDelete = async(req, res, Model) => {
    try {
        await Model.findByIdAndRemove(req.params.id);
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
    genericQueryOptions,
};