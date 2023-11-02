const { constants } = require('./../constants');

interface ErrorHandlerProps {
  err: any;
  req: any;
  res: any;
  next: any;
}

const errorHandler = ({ err, req, res, next }: ErrorHandlerProps) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'validation error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: 'not found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: 'unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: 'forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: 'server error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log('no error, all good!');
      break;
  }
};

module.exports = errorHandler;
