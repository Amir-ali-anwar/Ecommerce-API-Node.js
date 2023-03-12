const CustomAPIError = require('./custom-api');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const UnauthorizedError=require('./unauthrizedError')
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
};
