const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const PassportLocalStrategy   = require('passport-local').Strategy;
const userModel = require('../model/user')

const jwtToken = require('./jwtToken')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(
    new PassportLocalStrategy({}, async(username, password, done) => {
    try {
        const user = userModel.findOne({username, password});
        return done(null, user)
    } catch (error) {
        return done(null, false)
    }
}))

passport.use(new BearerStrategy(
    async function (token, done) {
        try {
            const checkToken = await jwtToken.decode(token)
            if (!checkToken) {
                throw(new Error('token not match'))
            }
            return done(null, checkToken, { scope: 'all' });
        } catch (error) {
            console.log(error)
            return done(null, false);
        }
        
    }
  ));

module.exports = passport;