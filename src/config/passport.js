const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

//para una nueva estrategia de autentificacion
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, passport, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        return done (null, false, {message: 'Not User Found.'});
    } else {
        const match = await user.matchPassword(passport);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password.'});
        }
    }
}));

//tomar un usuario y un callback 
passport.serializeUser((user,done) => {
    done(null, user.id);
});

//toma un id y genera un id
passport.deserializeUser((id,done) => {
    //se toma el id de la sesion
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

