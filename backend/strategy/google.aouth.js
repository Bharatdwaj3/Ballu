const passport = require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
require('dotenv').config();

const {  GOOGLE_CALLBACK_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/env.config');
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URI,
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done){
        console.log("GOOGLE PROFILE:", profile);
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});