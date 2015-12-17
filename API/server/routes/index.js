'use strict';

var express = require('express'),
    index   = express.Router();

index.get('/', function(req, res) {
    res.json({ success: true, error: false });
});

module.exports.index = index;
