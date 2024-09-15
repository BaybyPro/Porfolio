

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = Schema ({
    name:{type:String, required:true, maxlength:50},
    email:{type:String, required:true,maxlength:255,match:[/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo electrónico válido']},
    contact_number:{type:Number, required :true,maxlength:15},
    country_code:{type:String,required :true,maxlength:5},
    password:{type:String,require}
},{timestamps:true});


module.exports = mongoose.model('User',UserSchema);