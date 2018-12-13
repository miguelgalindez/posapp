const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController=require('../controllers/auth')

// Setting up the passport middleware for each provider
const googleAuth = passport.authenticate('google', { scope: ['profile'] })
const facebookAuth=passport.authenticate('facebook')

router.get('/google', googleAuth)
router.get('/google/callback', googleAuth, authController.handleGoogleCallback)
router.get('/facebook', facebookAuth)
router.get('/facebook/callback', facebookAuth, authController.handleTwitterCallback)

module.exports=router