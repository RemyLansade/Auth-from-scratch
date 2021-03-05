const db = require('../connection');

const user = db.Schema({
    username: {
        type: String,
        unique: true, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = db.model('User', user);

module.exports = User;