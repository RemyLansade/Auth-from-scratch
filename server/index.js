require('dotenv').config()
const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball'); // Volleyball is a tiny HTTP logger for debugging
const { handleError } = require('./helpers/error');

const app = express();

const middlewares = require('./auth/middleware');
const auth = require('./auth'); // Don't specify /index because node grab this automaticaly

app.use(volleyball);
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json()); // Replace bodyParser.json()
app.use(middlewares.checkTokenSetUser);

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨Hello World! 🌈✨🦄',
        user: req.user,
    });
});

app.use('/auth', auth);

app.use((err, req, res, next) => {
    handleError(err, res);
  });

app.listen(app.get('port'), () => {
    console.log('Listening on port: ' + app.get('port'));
});