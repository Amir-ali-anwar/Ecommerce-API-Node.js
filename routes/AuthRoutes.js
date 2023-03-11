const express = require("express");
const router= express.Router();
const { register, login, logout } = require("../Controllers/authController");

router.post('/login',login)
router.post('/register',register)
router.logout('/logout',logout)