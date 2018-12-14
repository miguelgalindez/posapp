const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController=require('../controllers/auth')


// This custom middleware allows us to attach the socket id to the session
router.use((req, res, next) => {
    console.log("Getting the socket ID from query: ",req.query)
    req.session.socketId = req.query.socketId
    next()
})

// Setting up the passport middleware for each provider
const googleAuth = passport.authenticate('google', { scope: ['profile'], failureRedirect: '/google' })
const facebookAuth=passport.authenticate('facebook', {failureRedirect: '/facebook'})

router.get('/google', googleAuth)
router.get('/google/callback', googleAuth, authController.handleGoogleCallback)
router.get('/facebook', facebookAuth)
router.get('/facebook/callback', facebookAuth, authController.handleTwitterCallback)

module.exports=router