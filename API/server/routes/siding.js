'use strict';

var express = require('express'),
    Router   = express.Router(),
    Siding = require('../../app/models/siding');

Router.delete('/:id', (req, res) => {
    Siding.findById(req.params.id, (err, siding) => {
        if (err) throw err;
        if (!siding) return res.status(422).json({ success: false, error: 'id not found in database' });
        siding.remove((err) => {
            if (err) throw err;
            res.json({ success: true, error: false });
        });
    });
});

Router.post('/', function(req, res) {
    if (!req.body.name || !req.body.name.trim()) return res.status(403).json({ success: false, error: 'no style name submitted' });

    let name = req.body.name.trim();

    let style = new Siding({
        name: name
    });
    style.save((err) => {
        if (err) throw err;
        return res.json({ success: true, error: false });
    });
});

module.exports.Router = Router;