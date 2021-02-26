class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
}

const respondError422 = (res, next) => {
  const error = new Error('Unable to login.');
  res.status(422);
  next(error);
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.json({
    status: "error",
    statusCode,
    message
  });
};


module.exports = {
    ErrorHandler,
    handleError,
    respondError422
}