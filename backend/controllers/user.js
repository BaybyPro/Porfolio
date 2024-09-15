const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {model} = require('mongoose');
const bcrypt = require('bcryptjs');


const userController = {

    signup: async (req,res)=>{
        const newUSer ={
            name : req.body.name,
            email: req.body.email,
            contact_number: req.body.contact_number,
            country_code: req.body.country_code,
            password: bcrypt.hashSync(req.body.password,5) 
        }

        try{
            const existingUser = await User.findOne({email: newUSer.email})
                if(existingUser){ return res.status(409).send({message:'Email ya registrado'})}
                const user = new User(newUSer)
                await user.save();
                const expires = 1 * 60 * 60;
                const token = await jwt.sign({_id:user._id},process.env.ACCESS_TOKEN,{expiresIn:expires});

                return res.json({token:token})
        }

        catch(err){
            console.log(err)
            if (err.name === 'ValidationError') {
                return res.status(400).json({errors: err.errors });
            }
            return res.status(500).json({message:'Error del servidor'})
        }
    },

    signin: async (req,res) =>{
        userData = {
            email:req.body.email,
            password:req.body.password
        }
        try{
            const user = await User.findOne({email: userData.email});
            if (!user) return res.status(404).json({message:'Usuario no encontrado'})
             const passwordValid = bcrypt.compareSync(userData.password,user.password);
            if(passwordValid){
                const expires = 1 * 60 * 60;
                const token = await jwt.sign({_id:user._id},process.env.ACCESS_TOKEN,{expiresIn:expires});
                return res.json({token:token})
            } else {
                res.status(404).send({message:'contraseña invalida'})
            }    
        }
        catch(err){
            console.log(err)
            if (err.name === 'ValidationError') {
                return res.status(400).json({errors: err.errors });
            }
            return res.status(500).json({ message: 'Error del servidor' });
        }
    },

    getUser: async(req, res)=>{
        try{
            const user = await User.findById(req.userId).select('-password');
            if(!user){
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.json(user);
        } catch (err){
            return res.status(500).json({ message: 'Error del servidor' });
        }
    },  

    authToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send('Cabecera inválida');
        }
    
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Token no válido');
        }
    
        try {
            const data = jwt.verify(token, process.env.ACCESS_TOKEN);
            req.userId = data._id;
            next();
        } catch (error) {
            console.log(error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({message:'Sessión finalziada'});
            } else {
                return res.status(401).send({message:'Error en la autenticación'});
            }
        }
    },
}

module.exports = userController;