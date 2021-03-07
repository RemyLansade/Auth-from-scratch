require('dotenv').config()
const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball'); // Volleyball is a tiny HTTP logger for debugging

const app = express();

const middlewares = require('./auth/middleware');
const { notFound, errorHandler } = require('./helpers/error');
const auth = require('./auth');
const notes = require('./api/notes');

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
app.use('/api/v1/notes', middlewares.isLoggedIn, notes);
  
app.use(notFound);  
app.use(errorHandler);

app.listen(app.get('port'), () => {
    console.log('Listening on port: ' + app.get('port'));
});