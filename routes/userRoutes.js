const express = require("express");
const router = express.Router();
const { getAllUsers, getSingleUser, UpdateUser, UpdateUserPassword,showCurrentUser } = require('../controllers/userController')


router.route('/').get(getAllUsers)
router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(UpdateUser)
router.route('/updateUserPassword').patch(UpdateUserPassword)
router.route('/:id').post(getSingleUser)

module.exports=router