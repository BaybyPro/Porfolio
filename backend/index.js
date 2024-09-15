'use strict'
var mongoose = require('mongoose')

var app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, ()=>{console.log(`Server conectado en el puerto ${process.env.PORT}`)})
mongoose.connect('mongodb://127.0.0.1:27017/portfile').then(console.log("base de datos conectado"));