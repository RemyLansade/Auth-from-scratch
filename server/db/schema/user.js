const db = require('../connection');

const user = db.Schema({
    username: {type: String, index: true}
});

const User = db.model('User', user);

module.exports = User;