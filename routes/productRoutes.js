const express = require('express')
const router = express.Router()
const { createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage } = require("../controllers/productController");

const { authenticateUser, authorizePermission } = require('../middleware/authentication')
router.route('/').post([authenticateUser, authorizePermission('admin')], createProduct).get(getAllProduct);

router.route('/:id').get(getSingleProduct)
    .patch([authenticateUser, authorizePermission('admin')], updateProduct)
    .delete([authenticateUser, authorizePermission('admin')], deleteProduct)

router.route('/uploadImage').post([authenticateUser, authorizePermission('admin')],uploadImage)


module.exports = router