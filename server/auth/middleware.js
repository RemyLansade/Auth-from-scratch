const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('authorization');
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        if(token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if(err) {
                    console.log(err);
                } 
                req.user = user;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

function isLoggedIn(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.status(401);
        const error = new Error('🚫 Un-Authorized 🚫');
        next(error);
    }
}

module.exports = {
    checkTokenSetUser,
    isLoggedIn,
};