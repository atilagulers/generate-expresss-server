const {CustomAPIError} = require('../errors');
const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong.',
  };

  //if (err instanceof CustomAPIError) {
  //  return res.status(err.statusCode).json({msg: err.message});
  //}

  if (err.name == 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((field) => field.message)
      .join(', ');

    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.fields = Object.keys(err.errors);

    return res
      .status(customError.statusCode)
      .json({msg: customError.msg, fields: customError.fields});
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.fields = Object.keys(err.keyValue);

    return res
      .status(customError.statusCode)
      .json({msg: customError.msg, fields: customError.fields});
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({msg: customError.msg});
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
};

module.exports = errorHandlerMiddleware;
