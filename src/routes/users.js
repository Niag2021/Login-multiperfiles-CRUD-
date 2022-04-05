const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) =>{
    //res.send('Ingresando a la app');
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    //res.send('Formulario de autentificacion')
    res.render('users/signup');
});


module.exports = router;