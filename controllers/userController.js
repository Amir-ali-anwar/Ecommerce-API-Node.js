const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");

const getAllUsers = async (req, res) => {
    res.send("getAllUsers")
}
const getSingleUser = async (req, res) => {
    res.send("getSingleUser")
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