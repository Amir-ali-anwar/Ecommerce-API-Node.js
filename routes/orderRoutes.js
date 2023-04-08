const express = require("express");
const router= express.Router();
const { createOrders, getAllOrders, getSingeOrder, getCurentUserOrders, updateOrder}=require('../controllers/orderController')
const {
    authenticateUser,
    authorizePermission,
  } = require('../middleware/authentication');

router.route('/').post(authenticateUser,createOrders).get(authenticateUser,authorizePermission('admin'),getAllOrders);
router.route('/showAllMyOrders').get(authenticateUser,getCurentUserOrders);
router.route('/:id').get(authenticateUser,getSingeOrder).patch(authenticateUser,updateOrder)

module.exports=router
