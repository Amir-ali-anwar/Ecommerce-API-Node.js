const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const Product =require('../models/Prouducts')
const { attachCookiesToResponse,createUserToken } = require('../utils/index')

const createProduct= async(res,req)=>{
    res.send('create Product')
}
const getAllProduct= async(res,req)=>{
    res.send('get All Product')
}
const getSingleProduct= async(res,req)=>{
    res.send('getSingleProduct')
}
const updateProduct= async(res,req)=>{
    res.send('updateProduct')
}
const deleteProduct= async(res,req)=>{
    res.send('deleteProduct')
}
const uploadImage= async(res,req)=>{
    res.send('uploadImage')
}
module.exports={
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}