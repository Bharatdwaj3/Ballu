const passport = require('passport');
const DiscordStrategy=require('passport-discord').Strategy;
const { DISCORD_CLIENT_SECRET, DISCORD_CLIENT_ID, DISCORD_CALLBACK_URI } = require('../config/env.config');
passport.use(new DiscordStrategy({
        clientID: DISCORD_CLIENT_ID,
        clientSecret: DISCORD_CLIENT_SECRET,
        callbackURL: DISCORD_CALLBACK_URI,
        scope: ['identify'],
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});