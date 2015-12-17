var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Material', new Schema({ 
    name: String,
    styles: [{
        name: String,
        id: String
    }]
}));