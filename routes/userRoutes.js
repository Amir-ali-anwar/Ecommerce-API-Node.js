const express = require("express");
const router = express.Router();
const {
    getAllUsers,getSingleUser,UpdateUser,UpdateUserPassword,showCurrentUser
} = require("../Controllers/userController");
const {authenticateUser,authorizePermission} =require('../middleware/authentication')

router.route('/').get(authenticateUser,authorizePermission('admin'), getAllUsers)
router.route('/showMe').get(authenticateUser,showCurrentUser)
router.route('/updateUser').patch(UpdateUser)
router.route('/updateUserPassword').patch(UpdateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports=router