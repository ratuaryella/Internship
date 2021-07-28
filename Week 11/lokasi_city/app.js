const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-mate');
const config = require('./config');
const webRoutes = require('./router/router');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Assets Public (css, JS) 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoutes);

app.use(function(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
        res.render('errors/404', { url: req.url });
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    res.type('txt').send('Not found');
});

app.use(function(req, res, next){
    res.status(403);

    if (req.accepts('html')) {
        res.render('errors/403', { url: req.url});
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Access Denied' });
        return;
    }

    res.type('txt').send('Access Denied');
});


app.listen(config.port, () => console.log(`App listening on port ${config.port}`));

module.exports = app;