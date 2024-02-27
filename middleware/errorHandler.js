const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
        res.json({
        message: err.message,
        stackTrace: err.stack,
    title: "Validation error"});
    break;
    case constants.NOT_FOUND:
        res.json({
        message: err.message,
        stackTrace: err.stack,
        title: "Not found"});
        break;
        case constants.UNAUTHORISED:
    res.json({
    message: err.message,
    stackTrace: err.stack,
    title: "unauthorised"});
    break;
    case constants.FORBIDDEN:
        res.json({
        message: err.message,
        stackTrace: err.stack,
        title: "Forbidden acces"});
        break;
        case constants.SERVER_ERROR:
    res.json({
    message: err.message,
    stackTrace: err.stack,
    title: "Server error"});
        default:
            console.log("Everything looks normal!");
            break;
    };
}

module.exports = errorHandler;