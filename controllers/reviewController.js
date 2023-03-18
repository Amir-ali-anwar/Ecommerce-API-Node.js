
const Product = require('../models/Prouducts')
const Review = require('../models/Review')
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const createReview = async (req, res) => {
   const {product:productId}=req.body
   const {UserId}=req.user
   req.body.user=UserId;
   const isValidProduct=  await Product.findOne({_id:productId})
   if(!isValidProduct){
    throw new CustomAPIError.NotFoundError(`Product does not exist with the id ${productId}`)
   } 
   const isAlreadySubmitted= await Review.findOne({
    product:productId,
    user:UserId
   })  
   if(isAlreadySubmitted){
    throw new CustomAPIError.BadRequestError(
        'Already submitted review for this product'
      );
   } 
   const review = await Review.create(req.body);
   res.status(StatusCodes.CREATED).json({ review }); 
}
const getAllReviews = async (req, res) => {
    const reviews= await Review.findOne({})
    res.status(StatusCodes.OK).json({ reviews,count:reviews.length }); 
}
const getSingleReview= async(req,res)=>{
    const {id:reviewId}=req.params;
    const singleReview= await Review.findOne({_id:reviewId})
    if(!singleReview){
        throw new CustomAPIError.NotFoundError('Review not found');
    }
    res.status(StatusCodes.OK).json({ singleReview }); 
}  
const updateReview= async(req,res)=>{
    res.send('updateReview')
}  
const deleteReview= async(req,res)=>{
    res.send('deleteReview')
}  

module.exports={
    createReview,getAllReviews,getSingleReview,deleteReview,updateReview
}