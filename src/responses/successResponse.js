const successResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        data: data,
    });
};

module.exports = successResponse;