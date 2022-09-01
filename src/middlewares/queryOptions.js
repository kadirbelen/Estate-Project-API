const errorResponse = require("../responses/errorResponse");
const statusCode = require("http-status-codes").StatusCodes;

const queryOptions = (req, res, next) => {
    const sortField = req.query.sortField;
    const sortOrder = req.query.sortOrder;

    let pageSize = parseInt(req.query.pageSize);
    let page = parseInt(req.query.page);

    if (pageSize && !page) {
        page = 1;
    }

    if (page && !pageSize) {
        pageSize = 10;
    }

    const blackList = ["pageSize", "page", "sortField", "sortOrder"];

    let mongoQuery = {};
    const keys = Object.keys(req.query);

    for (const key of keys) {
        const queryValue = req.query[key];
        const splitedKey = key.split(".");

        if (splitedKey.length !== 2) {
            if (blackList.includes(key)) {
                continue;
            }
            splitedKey[1] = "eq";
        }

        if (["gt", "lt", "lte", "gte"].includes(splitedKey[1])) {
            const regex = new RegExp(
                /^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2})$/
            );

            const isValidDateFormat = regex.test(queryValue);

            let newValue;

            if (isValidDateFormat) {
                const queryDate = new Date(queryValue);

                if (queryDate == "Invalid Date") {
                    return errorResponse(
                        res,
                        statusCode.BAD_REQUEST,
                        "Invalid date format"
                    );
                }

                newValue = queryDate;
            } else {
                const intValue = parseInt(queryValue);
                if (!intValue) {
                    return errorResponse(
                        res,
                        statusCode.BAD_REQUEST,
                        "Invalid integer format"
                    );
                }

                newValue = intValue;
            }

            const queryObject = {
                [`$${splitedKey[1]}`]: newValue,
            };
            mongoQuery[splitedKey[0]] = queryObject;
        } else if (["eq"].includes(splitedKey[1])) {
            mongoQuery[splitedKey[0]] = queryValue;
        } else if (["is"].includes(splitedKey[1])) {
            mongoQuery[splitedKey[0]] = queryValue ? true : false;
        } else if (["in"].includes(splitedKey[1])) {
            const values = queryValue.split(",");

            if (values.length > 0) {
                mongoQuery[splitedKey[0]] = { $in: values };
            }
        }
    }

    if (pageSize > 100) {
        pageSize = 100;
    } else if (pageSize < 1) {
        pageSize = 1;
    }

    if (page < 1) {
        page = 1;
    }

    const skip = page && pageSize ? (page - 1) * pageSize : null;

    req.queryOptions = {
        pagination: { pageSize, page, skip },
    };

    if ((sortOrder == -1 || sortOrder == 1) && sortField) {
        req.queryOptions.sorting = { sortField, sortOrder };
    }

    req.queryOptions.filtering = mongoQuery;

    next();
};

module.exports = queryOptions;