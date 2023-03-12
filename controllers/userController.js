const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const User = require("../models/User");
const { attachCookiesToResponse, createUserToken } = require('../utils/index')
const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-passwprd');
    res.status(StatusCodes.CREATED).json({ users, nbHits: users.length })
}
const getSingleUser = async (req, res) => {
    const id = req.params.id;
    const singleUser = await User.findById({ _id: id }).select('-password');
    if (!singleUser) {
        throw new CustomAPIError.NotFoundError(`Not found item with the id "${id}"`)
    }
    res.status(StatusCodes.OK).json({ singleUser });
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });

}
const UpdateUser = async (req, res) => {
    // console.log(req.user.userId);
    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomAPIError.BadRequestError("please provide Email and Name")
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    await user.save();
   const token= createUserToken(user);
   attachCookiesToResponse({ res, user: token });
   res.status(StatusCodes.OK).json({ tokendata, token })
}
const UpdateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomAPIError.BadRequestError(
            "Please provide old and new password"
        );
    }
    const user = await User.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomAPIError.UnauthenticatedError("Invalid password");
   }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Successfully Updated Password" });
};
 
module.exports = {
    getAllUsers, getSingleUser, UpdateUser, UpdateUserPassword, showCurrentUser
}