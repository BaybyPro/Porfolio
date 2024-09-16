'use strict'
var Contact = require('../models/contact');
var fs = require('fs');
var path = require('path');
const sendGrid = require('@sendgrid/mail');
const connection = require('../connection');
const { error } = require('console');
require('dotenv').config();

sendGrid.setApiKey(process.env.SENDGRID_KEY)

var controllers = {

    saveContact: async (req, res) => {
        let contact = req.body;
    
        try {
            // Ejecutar la consulta para insertar los datos en la tabla 'contacts'
            query = "INSERT INTO contacts (name, email, contact_number, country_code, message) VALUES (?,?,?,?,?)";
    
            await new Promise((resolve, reject) => {
                connection.query(query, [contact.name, contact.email, contact.contact_number, contact.country_code, contact.message], (err, result) => {
                    if (err) {
                        reject(err); // Si hay un error, rechazamos la promesa
                    } else {
                        resolve(result); // Si todo está bien, resolvemos la promesa
                    }
                });
            });
    
            // Enviar mensaje por SendGrid
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
            console.error(err);
            return res.status(500).json({ message: 'Error en el servidor', error: err });
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
