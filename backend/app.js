var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const ContactRouter = require('./routes/contact');
const UserRouter = require('./routes/user');
const cors = require('cors');

//middlweares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS
app.use(cors())
//rutas

app.use('/contact',ContactRouter);
app.use('/user',UserRouter);

//exportar
module.exports = app;