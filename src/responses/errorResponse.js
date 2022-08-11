const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        error: {
            message,
        },
    });
};

module.exports = errorResponse;