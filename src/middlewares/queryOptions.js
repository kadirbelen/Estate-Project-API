const errorResponse = require("../responses/errorResponse");
const statusCode = require("http-status-codes").StatusCodes;
const moment = require("moment");

const queryOptions = (req, res, next) => {
    const sortField = req.query.sortField;
    const sortOrder = req.query.sortOrder || 1;

    let pageSize = parseInt(req.query.pageSize);
    let page = parseInt(req.query.page);

    //pageSize bilgisi var page bilgisi yoksa default page ataması yapıldı
    if (pageSize && !page) {
        page = 1;
    }
    //page bilgisi var pageSize bilgisi yoksa default pageSize ataması yapıldı
    if (page && !pageSize) {
        pageSize = 10;
    }

    //Özel filtremeler için liste oluşturuldu
    const blackList = ["pageSize", "page", "sortField", "sortOrder"];

    let mongoQuery = {};
    const keys = Object.keys(req.query);
    for (const key of keys) {
        const queryValue = req.query[key];
        const splitedKey = key.split(".");
        //key değerini "." bilgisine göre ayırdıktan sonra uzunluğu kontrol ettik
        if (splitedKey.length !== 2) {
            if (blackList.includes(key)) {
                continue;
            }
            splitedKey[1] = "eq";
        }

        if (["gt", "lt", "lte", "gte"].includes(splitedKey[1])) {
            const regex = new RegExp(
                /^([1-2]\d{3})\-([0]\d|[1][0-2])\-([0-2]\d|[3][0-1])(?:(?:T([0-1]\d|[2][0-3])\:([0-5]\d)(?::([0-5]\d)))?)$/
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
                newValue = queryValue;
            }

            const queryObject = {
                [`$${splitedKey[1]}`]: newValue,
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
                $gt: gtValue + ".000Z",
            };
            const ltObject = {
                $lt: moment(queryValue)
                    .add(1, dateEnum[queryValue.length])
                    .format("YYYY-MM-DDTHH:mm:ss") + ".000Z",
            };
            mongoQuery[splitedKey[0]] = {...gtObject, ...ltObject };
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

    //req bilgisi içine querylerimizi dahil ettik
    req.queryOptions = {
        pagination: { pageSize, page, skip },
    };

    if ((sortOrder == -1 || sortOrder == 1) && sortField) {
        req.queryOptions.sorting = {
            [sortField]: parseInt(sortOrder),
        };
    }

    req.queryOptions.filtering = mongoQuery;

    next();
};

module.exports = queryOptions;