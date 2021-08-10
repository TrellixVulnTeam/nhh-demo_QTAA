const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
const { isAuth } = require('../app/middleware/Auth')

router.get('/',isAuth,siteController.index)

module.exports = router