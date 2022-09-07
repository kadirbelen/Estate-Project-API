// sorgulama ihtiyacı duyulmayan veriler için (iç-dış özellik // illeri getirmek)
const genericGet = async (Model) => {
    const newModel = await Model.find();
    return newModel;
};

const genericGetByQueryId = async (Model, id) => {
    const newModel = await Model.findById(id);
    return newModel;
};
// karmaşık olmayan sorgular için(ile göre ilçe getirme--)
const genericGetByQuery = async (Model, query) => {
    const newModel = await Model.find(query);
    return newModel;
};

// ilan detayı gibi liste(array) olmayan ancak populate kullanılacak sorgular için
const genericGetByQueryPopulate = async (Model, query, populate) => {
    const newModel = await Model.find(query).populate(populate);
    return newModel;
};
// middleware üzerinden gelen query bilgilerine göre sorgulama yapar
const genericQueryOptions = async (req, Model, query) => {
    if (query) {
        req.queryOptions.filtering = { ...req.queryOptions.filtering, ...query };
    }
    console.log("query", req.queryOptions.sorting);
    const { pageSize, page, skip } = req.queryOptions.pagination;
    const modelLength = await Model.find(req.queryOptions.filtering);
    const list = Model.find(req.queryOptions.filtering)
        .limit(pageSize)
        .skip(skip)
        .sort(req.queryOptions.sorting);
    return { list, modelLength, page, pageSize };
};

const genericPost = async (body, Model) => {
    const newModel = new Model(body);
    await newModel.save();
    return newModel;
};

const genericUpdate = async (id, body, Model) => {
    const newModel = await Model.findByIdAndUpdate(id, body, {
        new: true,
    });
    return newModel;
};

const genericDelete = async (id, Model) => {
    const newModel = await Model.findByIdAndRemove(id);
    return newModel;
};

module.exports = {
    genericDelete,
    genericPost,
    genericUpdate,
    genericGet,
    genericGetByQuery,
    genericGetByQueryPopulate,
    genericQueryOptions,
    genericGetByQueryId,
};
