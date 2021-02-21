require('dotenv').config()
const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball'); // Volleyball is a tiny HTTP logger for debugging

const app = express();

const auth = require('./auth'); // Don't specify /index because node grab this automaticaly

app.use(volleyball);
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json()); // Replace bodyParser.json()

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨Hello World! 🌈✨🦄'
    });
});

app.use('/auth', auth);

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(app.get('port'), () => {
    console.log('Listening on port: ' + app.get('port'));
});