const express = require("express");
const router = express.Router();
const {
    getAllUsers,getSingleUser,UpdateUser,UpdateUserPassword,showCurrentUser
} = require("../Controllers/userController");


router.route('/').get(getAllUsers)
router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(UpdateUser)
router.route('/updateUserPassword').patch(UpdateUserPassword)
router.route('/:id').get(getSingleUser)

module.exports=router