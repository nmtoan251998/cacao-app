const request = require('request')
const jwt = require('jsonwebtoken')
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../model/users.model');

const {
    clientId,
    clientSecret,
    callbackURL    
} = require('./key').facebook;

const User = require('../model/users.model');

module.exports = passport => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });  
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientId,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
        publicFields: ['name', 'id', 'token', 'name']
    },  async (accessToken, refreshToken, profile, done) => {
        try {
            if(!req.user) {
                const dbUser = await User.findOne({ 'facebook.id': profile.id });
                if(dbUser) {
                    return done(null, false);
                }
    
                const newFacebookProfile = new User({
                    accountname: profile.id,
                    password: 123456,
                    username: profile.displayName,
                    facebook: {
                        id: profile.id,
                        accessToken: accessToken,
                    }
                })

                newFacebookProfile.save()
                    .then(user => {
                        done(user.id);                        
                    })
                    .catch(err => {
                        done(err);
                    })
            }
    
            return done(null, req.user.id);
        } catch(err) {
            return done(err);
        }        
    }));
}