const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const webRoutes = require('./api/router/router');
const cors = require('cors');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/', webRoutes);

app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Method', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.use(express.static('./api_services/api/uploads'));

module.exports = app;