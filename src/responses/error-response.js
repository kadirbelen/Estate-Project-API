const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        statusCode,
        error: {
            message,
        },
    });
};

module.exports = errorResponse;