require('dotenv').config();
const express = require('express');
const Joi     = require('joi'); // Validate the data coming from /signup form fields.
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const { respondError422 } = require('../helpers/error');

const router = express.Router();

const db = require('../db/connection');
const users = db.get('users');

// Create users schema into db
users.createIndex('username', { unique: true });

// Create validate schema
const schema = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]{6,30}$')).required(),
    password: Joi.string().trim().min(6).required()
});


router.get('/', (req, res) => {
    res.json({
        message: '🔐'
    });
});


router.post('/signup', (req, res, next) => {
    const {username, password} = req.body;
    const result = schema.validate(req.body);
    if(!result.error) {
        users.findOne({
            username: username
        }).then((user) => {
            // If user is undefined, username isn't in the db, otherwise, duplicate user detected.
            if(user) {
                // There is already a user in the db whit this username.
                // Respond with an error!
                const error = new Error('That username already exist. Please choose another one.');
                res.status(409);
                next(error);
            } else {
                // Hash the password
                // Insert the user with hashed password
                bcrypt.hash(password, 8).then(hash => {
                    const newUser = {
                        username: username,
                        password: hash
                    }
                    users.insert(newUser).then(insertedUser => {
                        delete insertedUser.password; // Good practice to don't show hashed password
                        res.json(insertedUser);
                    });
                });
            }
        });
    } else {
        res.status(422);
        next(result.error);
    }
});

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    const result = schema.validate(req.body);
    if (!result.error){
        users.findOne({
            username: username
        }).then((findUser) => {
            if(findUser) {
                bcrypt.compare(password, findUser.password).then((result) => {
                    if(result) {
                        const payload = {
                            _id: findUser._id,
                            username: findUser.username
                        }
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if(!err){
                                res.json({
                                    token
                                });
                            } else {
                                respondError422(res, next);
                            }
                        });
                    } else {
                        respondError422(res, next);
                    }
                });
            } else {
                respondError422(res, next);
            }
        });
    } else {
        respondError422(res, next);
    }
});

module.exports = router;