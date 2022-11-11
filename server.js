const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database.js')
const app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

// Apply routers
app.use('/', require('./routes/index'))
app.use('/checklist', require('./routes/checklist'))

app.listen(80, function () {
    console.log('Node app is running on port 80');
});