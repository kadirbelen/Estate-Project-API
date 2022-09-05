const statusCode = require("http-status-codes").StatusCodes;
const moment = require("moment");
const errorResponse = require("../responses/errorResponse");

const queryOptions = (req, res, next) => {
    const { sortField } = req.query;
    const sortOrder = req.query.sortOrder || 1;

    let pageSize = parseInt(req.query.pageSize, 10);
    let page = parseInt(req.query.page, 10);

    // pageSize bilgisi var page bilgisi yoksa default page ataması yapıldı
    if (pageSize && !page) {
        page = 1;
    }
    // page bilgisi var pageSize bilgisi yoksa default pageSize ataması yapıldı
    if (page && !pageSize) {
        pageSize = 10;
    }

    // Özel filtremeler için liste oluşturuldu
    const blackList = ["pageSize", "page", "sortField", "sortOrder"];

    const mongoQuery = {};
    const keys = Object.keys(req.query);
    for (const key of keys) {
        const queryValue = req.query[key];
        const splitedKey = key.split(".");
        // key değerini "." bilgisine göre ayırdık
        if (splitedKey.length !== 2) {
            if (blackList.includes(key)) {
                continue;
            }
            splitedKey[1] = "eq";
        }

        if (["gt", "lt", "lte", "gte"].includes(splitedKey[1])) {
            const checked = parseInt(queryValue);

            if (!checked) {
                return errorResponse(
                    res,
                    statusCode.BAD_REQUEST,
                    "Invalid integer format"
                );
            }

            const queryObject = {
                [`$${splitedKey[1]}`]: queryValue,
            };

            mongoQuery[splitedKey[0]] = queryObject;
        } else if (["eqd"].includes(splitedKey[1])) {
            const dateEnum = {
                4: "year",
                7: "month",
                10: "day",
                13: "hour",
                16: "minute",
                19: "second",
            };
            const replacedQueryValue = queryValue.replaceAll(".", ":");
            const gtValue = moment(queryValue).format("YYYY-MM-DDTHH:mm:ss");

            const queryDate = new Date(gtValue);

            if (!dateEnum[queryValue.length] || queryDate == "Invalid Date") {
                return errorResponse(
                    res,
                    statusCode.BAD_REQUEST,
                    "Invalid date format"
                );
            }

            const gtObject = {
                $gt: `${gtValue}.000Z`,
            };
            const ltObject = {
                $lt: `${moment(replacedQueryValue)
                    .add(1, dateEnum[queryValue.length])
                    .format("YYYY-MM-DDTHH:mm:ss")}.000Z`,
            };
            mongoQuery[splitedKey[0]] = {...gtObject, ...ltObject };
        } else if (["eq"].includes(splitedKey[1])) {
            mongoQuery[splitedKey[0]] = queryValue;
        } else if (["is"].includes(splitedKey[1])) {
            mongoQuery[splitedKey[0]] = !!queryValue;
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

    // req bilgisi içine querylerimizi dahil ettik
    req.queryOptions = {
        pagination: { pageSize, page, skip },
    };

    if ((sortOrder == -1 || sortOrder == 1) && sortField) {
        req.queryOptions.sorting = {
            [sortField]: parseInt(sortOrder, 10),
        };
    }

    req.queryOptions.filtering = mongoQuery;

    return next();
};

module.exports = queryOptions;