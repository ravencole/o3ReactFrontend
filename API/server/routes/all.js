'use strict';

var express  = require('express'),
    Router   = express.Router(),
    Siding   = require('../../app/models/siding'),
    Material = require('../../app/models/material');

Router.get('/', (req, res) => {
    var output = {};

    getMaterials();

    function getMaterials() {
        Material.find({}, null, {sort: {'_id': 1}},(err, materials) => {
            if (err) return res.status(500).json({ success: false, error: 'this probably isn\'t your fault' });
            output.materials = materials;
            getSidings();
        });
    }
    function getSidings() {
        Siding.find({}, (err, sidings) => {
            if (err) return res.status(500).json({ success: false, error: 'this probably isn\'t your fault' });
            output.siding = sidings;
            return res.json(output);
        });
    }
});

module.exports.Router = Router;