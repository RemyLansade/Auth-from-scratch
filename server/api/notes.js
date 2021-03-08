const express = require('express');
const Joi = require('joi');

const Note = require('../db/schema/note');

const router = express.Router();

const schema = Joi.object().keys({
    title: Joi.string().trim().max(100).required(),
    note: Joi.string().trim().required(),
});

router.get('/', (req, res) => {
    Note.find({user_id: req.user._id})
        .then(notes => {
            res.json(notes);
        })
});

router.post('/', (req, res, next) => {
    const result = schema.validate(req.body);
    if(!result.error){
        const newNote = new Note({
            ...req.body,
            user_id: req.user._id,
        });
        newNote
            .save()
            .then((insertedNote) => {
                res.json(insertedNote);
            });
    } else {
        res.status(422);
        const error = new Error(result.error);
        next(error);
    }
});

module.exports = router;