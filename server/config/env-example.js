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
    passportGithubStrategyProperties = {
        clientID: GOOGLE_CONSUMER_KEY,
        clientSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:9308/auth/google/callback"
    },
    expressSessionSecret: YOUR_SECRET,
    
    mongoDb: {
        url: "mongodb://posapp:password@localhost:27017/posapp",
        options: {
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 3000,
            keepAlive: true,
            autoIndex: false,
            useFindAndModify: false
        }
    }
}