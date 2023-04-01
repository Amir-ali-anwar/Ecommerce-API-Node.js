const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const Order = require('../models/Order')

const createOrders = async (req, res) => {
    res.send("createorders")
}
const getAllOrders = async (req, res) => {
    res.send("getAllorders")
}

const getSingeOrder = async (req, res) => {
    res.send("getSingeorder")
}
const getCurentUserOrders = async (req, res) => {
    res.send("getCurentUserOrders")
}
const updateOrder = async (req, res) => {
    res.send("updateOrder")
}

module.exports = {
    createOrders, getAllOrders, getSingeOrder, getCurentUserOrders, updateOrder
}