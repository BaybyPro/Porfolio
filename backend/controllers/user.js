const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { model } = require('mongoose');
const bcrypt = require('bcryptjs');
const connection = require('../connection');

const userController = {

    signup: async (req, res) => {

        let user = req.body;
        query = "select email  from users where email=?";
        connection.query(query, [user.email], (err, results) => {
            if (!err) {
                if (results.length <= 0) {
                    query = "insert into users(name, email, contact_number, country_code, password) values(?,?,?,?,?)";
                    connection.query(query, [user.name, user.email, user.contact_number, user.country_code, bcrypt.hashSync(user.password,5)], (err, result) => {
                        if (err) {
                            return res.status(500).json(err)
                        }
                        const accessToken = jwt.sign({ id: result.insertId }, process.env.ACCESS_TOKEN, { expiresIn: 4 * 60 * 60  });
                        res.status(200).json({ token: accessToken });
                    })
                }
                else {
                    return res.status(400).json({ message: "El email ya esta registrado" })
                }
            } else {
                return res.status(500).json(err)
            }
        });
    },

    signin: async (req, res) => {
        const user = req.body;
        query = "select id, email,password from users where email=?"
        connection.query(query, [user.email], (err, result) => {
            if (!err) {
                if (result.length <= 0 || !bcrypt.compareSync(user.password, result[0].password)) {
                    return res.status(401).json({ message: "Incorrect Email or password" })
                }
                    const accessToken = jwt.sign({id:result[0].id}, process.env.ACCESS_TOKEN, { expiresIn: 24 * 60 * 60 })
                    return res.status(200).json({ token: accessToken })
            } else {
                return res.status(500).json(err)
            }
        })
    },

    getUser: async (req, res) => {
        const userId = req.id;  
        const query = "SELECT  name, email, contact_number, country_code FROM users WHERE id = ?";  
        connection.query(query, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor', error: err });
            }
    
            if (result.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            
            const user = result[0];
            return res.json(user);
        });
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
            req.id = data.id;
            next();
        } catch (error) {
            console.log(error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Sessión finalziada' });
            } else {
                return res.status(401).send({ message: 'Error en la autenticación' });
            }
        }
    },
}

module.exports = userController;