'use strict'
var Contact = require('../models/contact');
var fs = require('fs');
var path = require('path');
const sendGrid = require('@sendgrid/mail')
require('dotenv').config();

sendGrid.setApiKey(process.env.SENDGRID_KEY)

var controllers = {

    saveContact: async (req, res) => {
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            contact_number: req.body.contact_number,
            country_code:req.body.country_code
        });

        try {
            const contactStore = await contact.save();
            if (!contactStore) {
                throw new Error('No se ha podido guardar el formulario');
            }
  
            const messageData = {
                to: process.env.EMAIL,  
                from: process.env.EMAIL, 
                subject: `Confirmación de contacto de parte de ${contact.name}`,
                text: `El cliente ${contact.name}, quiere comunicarse contigo`,
                html: `<h3>De ${contact.name},</h3><p>Correo: ${contact.email}</p><p>Numero: ${contact.country_code} ${contact.contact_number}</p><p>${contact.message}</p>`
            };

            await sendGrid.send(messageData);

            return res.status(200).json({ message: 'Mensaje enviado con éxito' });
        } catch (err) {
            console.log(err)
            if (err.name === 'ValidationError') {
                return res.status(400).json({errors: err.errors });
            }
            return res.status(500).json({ message: 'Error del servidor' });
            
        }
    },

    getCV: (req,res)=>{
        res.setHeader('Content-Type', 'application/pdf');
        const filePath = path.join(__dirname, '../document/CV-KevinVictorMamaniMamaniP.pdf');
        res.download(filePath, (err)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
        })

    }
};

module.exports = controllers;
