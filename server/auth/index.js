const express = require('express');
const Joi = require('joi'); // Validate the data coming from /signup form fields.

const router = express.Router();

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
});

router.get('/', (req, res) => {
    res.json({
        message: '🔐'
    });
});

router.post('/signup', (req, res) => {
    const result = schema.validate(req.body);
    res.json(result);
});

module.exports = router;