'use strict';

let express  = require('express'),
    Router   = express.Router(),
    Material = require('../../app/models/material'),
    Siding   = require('../../app/models/siding');

Router.get('/:id',(req, res) => {
    if (!req.params.id || !req.params.id.trim() || req.params.id.indexOf(':') === -1) return res.status(422).json({ success: false, error: 'no valid id submitted' });

    let RegEx      = /([^:]+):(\S+)/,
        materialId = req.params.id.replace(RegEx, '$1'),
        sidingId   = req.params.id.replace(RegEx, '$2');
    
    Material.findById(materialId, (err, material) => {
        if (err) return res.status(422).json({ success: false, error: 'seems like some non-sense id\'s were sent to the server' });
        if (!material) return res.status(422).json({ success: false, error: 'no matching id found in the database' });
        findSidng(material);
    });

    function findSidng(material) {
        Siding.findById(sidingId, (err, siding) => {
            if (err) return res.status(422).json({ success: false, error: 'siding id is not properly formatted' });
            if (!siding) return res.status(422).json({ success: false, error: 'siding id not found' });

            toggleSidingStyle(material, siding);
        });
    }
    function toggleSidingStyle(material, siding) {
        let materialStylesIndexOfID = material.styles.findIndex(findId);
        if (materialStylesIndexOfID === -1) {
            let sidingStyleObj = {
                name: siding.name,
                id: siding.id
            }
            material.styles.push(sidingStyleObj);
            material.save();
            return res.json({ success: true, operation: `added ${siding.name} to ${material.name}` });
        }
        material.styles.splice(materialStylesIndexOfID, 1);
        material.save();
        return res.json({ success: true, operation: `removed ${siding.name} from ${material.name}` });
    }
    function findId(element, index, array) {
        if (element.id === sidingId) return true;
        return false;
    }
});

Router.delete('/:id', (req, res) => {
    Material.findById(req.params.id, (err, material) => {
        if (err) throw err;
        if (!material) return res.status(422).json({ success: false, error: 'id not found in database' });
        material.remove((err) => {
            if (err) throw err;
            return res.json({success: true, error: false});
        });
    });
});

Router.post('/', (req, res) => {
    if (!req.body.name || !req.body.name.trim()) return res.status(403).json({ success: false, error: 'no material name submitted' });
    
    let name = req.body.name.trim();

    let material = new Material({
        name: name,
        styles: []
    });
    material.save((err) => {
        if (err) throw err;
        return res.status(200).json({ success: true, error: false });
    });
});

module.exports.Router = Router;


