const express = require('express');
const Joi = require('joi'); // Validate the data coming from /signup form fields.
const bcrypt = require('bcryptjs');

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
    const result = schema.validate(req.body);
    if(!result.error) {
        users.findOne({
            username: req.body.username
        }).then((user) => {
            // If user is undefined, username isn't in the db, otherwise, duplicate user detected.
            if(user) {
                // There is already a user in the db whit this username.
                // Respond with an error!
                const error = new Error('That username already exist. Please choose another one.');
                next(error);
            } else {
                // Hash the password
                // Insert the user with hashed password
                bcrypt.hash(req.body.password, 8).then(hash => {
                    const newUser = {
                        username: req.body.username,
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
        next(result.error);
    }
});

module.exports = router;