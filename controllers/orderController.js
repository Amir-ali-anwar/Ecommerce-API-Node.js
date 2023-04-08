const Order = require('../models/Order');
const Product = require('../models/Prouducts');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');
const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue';
    return { client_secret, amount };
};
const createOrders = async (req, res) => {
    console.log(req.user)
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide the tax and shippingFee');
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of cartItems) {
        const dbproduct = await Product.findOne({ _id: item.product });
        if (!dbproduct)
            throw new CustomError.NotFoundError("Item does not exist, please provide the valid item")

        const { name, price, image, _id } = dbproduct;
        const singleOrderItems = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id
        }
        orderItems = [...orderItems, singleOrderItems]
        subtotal += item.amount * price
    }
    const total = tax + shippingFee + subtotal;
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
    });
    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.UserId,
    });

    res.status(StatusCodes.OK).json({ order, clientSecret: order.clientSecret });
}
const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

const getSingeOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.BadRequestError("No order found")
    }
    checkPermissions(req.user, order.user)
    res.status(StatusCodes.OK).json({ order });
}
const getCurentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ orders, count: orders.length });

}
const updateOrder = async (req, res) => {
    res.send("updateOrder")
}

module.exports = {
    createOrders, getAllOrders, getSingeOrder, getCurentUserOrders, updateOrder
}