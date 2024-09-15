

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = Schema({
    name:{type:String, required:true, maxlength:50},
    email:{type:String, required:true,maxlength:255,match:[/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo electrónico válido']},
    message:{type:String, required:true,maxlength:500},
    contact_number:{type:Number, required :true,maxlength:15},
    country_code:{type:String,required :true,maxlength:5}
});

module.exports = mongoose.model('contacts',ContactSchema);