const successResponse = (res, statusCode, data, pagination) => {
    res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        pagination: pagination,
        data: data,
    });
};

module.exports = successResponse;