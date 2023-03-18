const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const Product = require('../models/Prouducts')
const { attachCookiesToResponse, createUserToken } = require('../utils/index')

const createProduct = async (req, res) => {
    req.body.user = req.user.UserId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}
const getAllProduct = async (req, res) => {
    const product = await Product.find({})
    res.status(StatusCodes.OK).json({ product, nbHits:product.length})

}
const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({ _id: id })
    if (!product) {
        throw new CustomAPIError.NotFoundError("Product not found with the id")
    }
    res.status(StatusCodes.OK).json({ product, nbHits: product.length })
}
const updateProduct = async (req, res) => {
    res.send('updateProduct')
}
const deleteProduct = async (req, res) => {
    res.send('deleteProduct')
}
const uploadImage = async (req, res) => {
    res.send('uploadImage')
}
module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}