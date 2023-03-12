const express = require("express");
const router = express.Router();
const {
    getAllUsers,getSingleUser,UpdateUser,UpdateUserPassword,showCurrentUser
} = require("../Controllers/userController");
const {authenticateUser} =require('../middleware/authentication')

router.route('/').get(authenticateUser, getAllUsers)
router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(UpdateUser)
router.route('/updateUserPassword').patch(UpdateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports=router