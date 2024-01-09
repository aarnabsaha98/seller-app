const { constants } = require('../CONSTANT')
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                Title: 'Validation Error',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.UNAUTHARIZED:
            res.json({
                Title: 'UNAUTHARIZED',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                Title: 'Not Found',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                Title: 'FORBIDDEN',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                Title: 'Server Error',
                message: err.message,
                stackTrace: err.stack
            })
            break;

        default:
            break;
    }

    res.json({ message: err.message, })
};

module.exports = errorHandler;