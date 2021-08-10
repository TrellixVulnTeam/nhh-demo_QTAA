const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/authController')
const validator  = require('../app/middleware/validator')

router.get('/login',authController.login)

router.post('/login',authController.authLogin)

router.get('/signup',authController.signup)

router.post('/signup',validator.validateRegisterUser(),authController.create)


module.exports = router