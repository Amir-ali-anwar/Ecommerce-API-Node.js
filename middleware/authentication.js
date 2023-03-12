const CustomAPIError = require("../errors/");
const { isValidToken } = require('../utils/')
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomAPIError.UnauthenticatedError("Authetication invalid");
  }
  try {
    const { name, UserId, role,email } = isValidToken({ token })
    req.user = { name, UserId, role,email };

  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError("Authetication invalid");
  }

  next()
}

const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomAPIError.UnauthorizedError("Not authorized to access this route")
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizePermission
}