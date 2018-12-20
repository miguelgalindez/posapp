const passport=require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy
const GithubStrategy=require('passport-github').Strategy
const environmentProperties=require('../config/env')
const debug = require('debug')('server:passport-setting-up');

module.exports=()=>{
    const callback=(accessToken, refreshToken, profile, done)=>{
        // The function that is called when an OAuth provider sends back user 
        // information.  Normally, you would save the user to the database 
        // in a callback that was customized for each provider.        
        done(null, profile)
    }

    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))
    
    passport.use(new FacebookStrategy(environmentProperties.passportFacebookStrategyProperties, callback))
    passport.use(new GoogleStrategy(environmentProperties.passportGoogleStrategyProperties, callback))
    passport.use(new GithubStrategy(environmentProperties.passportGithubStrategyProperties, callback))
}