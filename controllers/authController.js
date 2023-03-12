const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const { attachCookiesToResponse,createUserToken } = require('../utils/index')
const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new CustomAPIError.BadRequestError("please provide all the values")
  }
  const alreadyExist = await User.findOne({ email })
  if (alreadyExist) {
    throw new CustomAPIError.BadRequestError("Email already exist")
  }
  const isFirstUser = await User.countDocuments({}) === 0;
  const role = isFirstUser ? "admin" : "user";
  const user = await User.create({ name, email, password, role })
  const tokendata = createUserToken(user)
  const token = attachCookiesToResponse({ res, user: tokendata })
  res.status(StatusCodes.CREATED).json({ tokendata, token })
  
}
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError.BadRequestError("Please provide Email and Password")
  }
  const isExist = await User.findOne({ email });
  if (!isExist) {
    throw new CustomAPIError.UnauthenticatedError("invalid credentails")
  }
  const isPasswordCorrect = await isExist.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError("Password not Correct")
  }
  const tokenUser = createUserToken(isExist)
  const token = attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ tokenUser, token })
  
}
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5*1000),
  });
  res.status(StatusCodes.CREATED).json({msg:'user logged out !' });
}

module.exports = {
  register,
  login,
  logout,
};
