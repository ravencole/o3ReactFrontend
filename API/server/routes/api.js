'use strict';

var express  = require('express'),
    api      = express.Router(),
    jwt      = require('jsonwebtoken'),
    User     = require('../../app/models/user'),
    bcrypt   = require('bcrypt'),
    mongoose = require('mongoose'),
    Siding   = require('../../app/models/siding');


api.use('/all', require('./all').Router);

api.post('/authenticate', function(req, res) {

    if (!req.body.email || !req.body.password) {
        return res.status(403).json({ success: false, error: 'no email and/or password submitted.' });
    }

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(422).json({ success: false, error: 'Username or password incorrect.' });
        } else if (user) {
            // hash check business returns a boolean
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(422).json({ success: false, error: 'Username or password incorrect.'});
            } else {

                var token = jwt.sign(user, 'secret', {
                    expiresIn: 86400 // expires in 24 hours
                });

                return res.status(200).json({
                    success: true,
                    error: false,
                    token: token
                });
            }   
        }
    });
});

api.use(function(req, res, next) {

    // don't matter how we get it, but we need it
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {      
        if (err) return res.status(403).json({ success: false, error: 'Failed to authenticate token.' });    
        req.decoded = decoded;    
        next();
    });

    } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        error: 'No token provided.' 
    });

    }
});
//really just here to test the api
api.get('/', (req, res) => {
    res.status(200).json({ success: true, error: false });
});

api.use('/siding', require('./siding').Router);
api.use('/material', require('./material').Router);

module.exports.api = api;