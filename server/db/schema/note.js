const db = require('../connection');

const note = db.Schema({
    title: {
        type: String,
        unique: true,
    },
    note: String,
    user_id: String,
});

module.exports = db.model('Note', note);