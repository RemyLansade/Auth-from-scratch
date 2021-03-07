require('dotenv').config();
const express = require('express');
const Joi     = require('joi'); // Validate the data coming from /signup form fields.
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const User = require('../db/schema/user');

const router = express.Router();

// Create validate schema
const schema = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]{6,30}$')).required(),
    password: Joi.string().trim().min(6).required()
});

function createTokenSendResponse(user, res, next) {
    const payload = {
        _id: user._id,
        username: user.username
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
}

function respondError422(res, next) {
    res.status(422);
    const error = new Error('Unable to login.');
    next(error);
}

router.get('/', (req, res) => {
    res.json({
        message: '🔐'
    });
});


router.post('/signup', (req, res, next) => {
    const {username, password} = req.body;
    const result = schema.validate(req.body);
    if(!result.error) {
        User.findOne({
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
                    const newUser = new User({
                        username: username,
                        password: hash
                    });

                    newUser.save().then(insertedUser => {
                        createTokenSendResponse(insertedUser, res, next);
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
        User.findOne({
            username: username
        }).then((findUser) => {
            if(findUser) {
                bcrypt.compare(password, findUser.password).then((result) => {
                    if(result) {
                        createTokenSendResponse(findUser, res, next);
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