const errorHandler = (err, req, res, next) => {
    // console.log(err)
    switch (err.name) {
        case "SequelizeValidationError":
            const errValidationMessages = [];
            err.errors.forEach(error => {
                errValidationMessages.push(error.message);
            });
            return res.status(400).json({
                message: "Validation Error", errors: errValidationMessages
            })
        case "SequelizeUniqueConstraintError":
            const errUniqueMessages = [];
            err.errors.forEach(error => {
                errUniqueMessages.push(error.message);
            });
            return res.status(400).json({
                message: "Validation Error", 
                errors: errUniqueMessages
            });
        case "Validation_error":
            return res.status(err.status).json({
                message: err.message
            });
        default:
            return res.status(500).json({
                message: 'Internal Server Error'
            });
    }
}

module.exports = errorHandler;