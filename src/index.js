const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const methodOverride = require('method-override');
const session = require('express-session');
// Initializations (Inicializaciones) 
//objeto express se guarda en app 
const app = express();
require('./database');

// Settings (Configuraciones) 
app.set('port', process.env.PORT || 3000);
//Establecer las vistas
//path.join es para unir directorios 
app.set('views', path.join(__dirname, 'views'));
//engine (.hbs) es el nombre que tendran los archivos
// de las vistas
app.engine('.hbs', exphbs.engine({
    //modulo exphbs con los siguientes propiedades
    //de configuracion

    //defaultLayout: parte superior que se repetira
    //en todas las vistas (en views/layouts/main.hbs)
    
    //layoutsDir: ubicacion carpeta layouts
    
    //partialsDir: partes html reutilizable 

    //extname: que extensiones tendran los archivos 

    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
//para utilizar lo anterior (para configurar el motor de las vistas)
//el motor de las vistas sera .hbs
app.set('view engine', '.hbs');

// Middlewares (Funciones) 
//cuando un form envia datos pueda entenderlos
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
//ahora en la siguiente linea son configuraciones por defecto 
app.use(session({
    secret: 'mysecretapp', 
    resave: true, 
    saveUninitialized: true 
}));


// Global Variables (Variables globales) 


// Routes (Rutas) 
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files (Archivos estaticos) 
app.use(express.static(path.join(__dirname, 'public')));


// Server is listenning (Iniciar servidor)
app.listen(app.get('port'), () => {
    console.log('Server on port :', app.get('port'));
});