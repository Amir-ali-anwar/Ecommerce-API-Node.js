// const Order = require('../models/Order');
const Product = require('../models/Prouducts');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
// const { checkPermissions } = require('../utils');

const createOrders = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }
    if(!tax || !shippingFee ){
        throw new CustomError.BadRequestError('Please provide the tax and shippingFee');
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of cartItems) {
        const dbproduct= await Product.findOne({_id:item.product});
        if(!dbproduct)
        throw new CustomError.NotFoundError("Item does not exist, please provide the valid item")
    }   
    const { name, price, image, _id } = dbproduct;
    const singleOrderItems= {
        amount:item.amount,
        name,
        price,
        image,
        product:_id 
    }
    orderItems=[...orderItems,singleOrderItems]
    
    res.send('createorder')
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