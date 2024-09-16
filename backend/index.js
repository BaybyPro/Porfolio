'use strict'


var app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, ()=>{console.log(`Server conectado en el puerto ${process.env.PORT}`)})
