const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController=require('../controllers/auth')


// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to 
// the right socket
const addSocketIdToSession=(req, res, next)=>{
    req.session.socketId = req.query.socketId
    req.session.save()    
    next()
}

// Setting up the passport middleware for each provider
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect: '/google' })
const facebookAuth=passport.authenticate('facebook', {failureRedirect: '/facebook'})
const githubAuth=passport.authenticate('github', {failureRedirect: '/github'})

router.get('/google', addSocketIdToSession, googleAuth)
router.get('/facebook', addSocketIdToSession, facebookAuth)
router.get('/github', addSocketIdToSession, githubAuth)

router.get('/google/callback', googleAuth, authController.handleGoogleCallback)
router.get('/facebook/callback', facebookAuth, authController.handleFacebookCallback)
router.get('/github/callback', githubAuth, authController.handleGithubCallback)

module.exports=router