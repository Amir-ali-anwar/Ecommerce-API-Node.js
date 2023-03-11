const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const {CreateJWT}=require('../utils/index')
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
  const token= CreateJWT({user})
  res.status(StatusCodes.CREATED).json({ user},token)

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
