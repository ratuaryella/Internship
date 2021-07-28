const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressLayouts = require('express-ejs-layouts')

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// View
app.use(express.static('public'))
// app.use('/css',express.static(__dirname+ 'public/css'))
// app.use('/js', express.static(__dirname+'public/js'))

// Set
app.use(expressLayouts)
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/home', (req, res)=>{
  res.render('index', { title: 'Home Page'})
})

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);