'use strict';

var express = require('express'),
    setup   = express.Router(),
    bcrypt  = require('bcrypt'),
    User    = require('../../app/models/user');

// var password = '$cotland';

// var salt = bcrypt.genSaltSync(10),
//     hash = bcrypt.hashSync(password, salt);

// setup.get('/', function(req, res) {

//   res.send('na');
//     // create a sample user
//   var person = new User({ 
//     email: 'they@gmail.com', 
//     password: hash
//   });

//   // save the sample user
//   person.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully');
//     res.json({ success: true });
//   });
// });

module.exports.setup = setup;

