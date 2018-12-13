module.exports={
    passportFacebookStrategyProperties = {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:9308/auth/facebook/callback"
    },
    passportGoogleStrategyProperties = {
        clientID: GOOGLE_CONSUMER_KEY,
        clientSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:9308/auth/google/callback"
    },
    expressSessionSecret: "",
    
}