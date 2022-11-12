const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));

// Apply routers
app.use('/', require('./routes/index'));
app.use('/checklist', require('./routes/checklist'));
app.use('/profile', require('./routes/profile'));
app.use('/groups', require('./routes/groups'));
app.use('/groupView', require('./routes/groupView'));

app.listen(80, function () {
    console.log('Node app is running on port 80');
});