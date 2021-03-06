const express = require('express');
const router = express.Router();
const User = require ('../models/User');
const passport = require('passport'); 

router.get('/users/signin', (req, res) =>{
    //res.send('Ingresando a la app');
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    //res.send('Formulario de autentificacion')
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    //console.log(req.body);
    const { name, email, password, confirm_password } = req.body; 
    //res.send('ok');
    const errors = [];
    //console.log(req.body);
    if (name.length <= 0){
        errors.push({text: 'Please Insert your Name.'});
    }
    if (password != confirm_password){
        errors.push({text: 'Password do not match.'});
    }
    if (password.length < 4){
        errors.push({text: 'Password must be at least 4 characters.'});
    }
    if (errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else{
        //valida lo siguiente que no es un email repetido
        const email = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'The Email is already in use.');
            res.redirect('/users/signin');
        }
        //res.send('ok');
        const newUser = new User({name, email, password});
        //guardar contraseña cifrada
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered.')
        res.redirect('/users/signin');
    }
});


module.exports = router;