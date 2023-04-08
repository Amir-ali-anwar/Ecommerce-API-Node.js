const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const Product = require('../models/Prouducts')
const { attachCookiesToResponse, createUserToken } = require('../utils/index')
const path = require('path');
const createProduct = async (req, res) => {
    req.body.user = req.user.UserId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}
const getAllProduct = async (req, res) => {
    const product = await Product.find({})
    res.status(StatusCodes.OK).json({ product, nbHits: product.length })

}
const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({ _id: id }).populate('reviews').select('title comment')
    if (!product) {
        throw new CustomAPIError.NotFoundError(`Product not found with the id: ${id}`)
    }
    res.status(StatusCodes.OK).json({ product, nbHits: product.length })
}
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        runValidators: true,
        new: true,
    })
    if (!product) {
        throw new CustomAPIError.NotFoundError(`Product not found with the id: ${id}`)
    }
    res.status(StatusCodes.OK).json({ product });
}
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id })
    if (!product) {
        throw new CustomAPIError.NotFoundError(`Product not found with the id: ${id}`)
    }
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: "Success! Product Removed" })
}
const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new CustomAPIError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomAPIError.BadRequestError('Please Upload Image');
    }
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new CustomAPIError.BadRequestError('Please upload image smaller than 1MB');
    }
    const ImagePath= await path.join(__dirname,'../public/uploads/' + `${productImage.name}`)
    await productImage.mv(ImagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
}
module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}