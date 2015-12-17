'use strict';

let express    = require('express'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    mongoose   = require('mongoose'),
    cors       = require('cors');

let config     = require('./config'),
    User       = require('./../app/models/user');

let app        = express();

mongoose.connect(config.database.siding, (err) => { 
    if (err) throw err;
    console.log('connected to ' + config.database.siding);
});


app.set('superSecret', config.secret);
app.set('port', 8080);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));


app.use('/api', require('./routes/api').api);

app.get('*', (req, res) => {
    res.status(404).json({ success: false, error: 'not a route' });
});


app.listen(app.get('port'));
console.log('API at http://localhost:' + app.get('port'));






