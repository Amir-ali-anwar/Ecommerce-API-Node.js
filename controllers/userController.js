const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const User = require("../models/User");
const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-passwprd');
    res.status(StatusCodes.CREATED).json({ users, nbHits:users.length })
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
    res.send("showCurrentUser")

}
const UpdateUser = async (req, res) => {
    res.send("UpdateUser")
}
const UpdateUserPassword = async (req, res) => {
    res.send("UpdateUserPassword")
}

module.exports={
    getAllUsers,getSingleUser,UpdateUser,UpdateUserPassword,showCurrentUser
}