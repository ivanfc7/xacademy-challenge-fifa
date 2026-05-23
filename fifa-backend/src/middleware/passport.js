const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../services/user');

const secret = 'claveSecretaQueSoloElServidorConoce';

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, async (jwtPayload, done)=>{
    try {
        const user = await User.getUser(jwtPayload.id);
        if(user){
            return done(null, user);
        }else{
            return done(null, false, {message: "Autenticaion invalida"})
        }
    } catch (error) {
        console.log(`El error es: ${error}`);
    }
}));

module.exports = passport;

