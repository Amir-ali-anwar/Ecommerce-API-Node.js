const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const {attachCookiesToResponse}=require('../utils/index')
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
  const tokendata= {name:user.name,email:user.email,role:user.role,userID:user._id}
  const token= attachCookiesToResponse({res,user:tokendata})
  res.status(StatusCodes.CREATED).json({ tokendata,token})

}
const login = async (req, res) => {
  res.send('login')
}
const logout = async (req, res) => {
  res.send('logout')
}




module.exports = {
  register,
  login,
  logout,
};
