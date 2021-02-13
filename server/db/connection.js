const monk = require('monk');
const db = monk('localhost:27017/auth-for-noobs', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = db;