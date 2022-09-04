const successResponse = (res, statusCode, data, pagination) => {
    res.status(statusCode).json({
        success: true,
        statusCode,
        pagination,
        data,
    });
};

module.exports = successResponse;
