'use strict';

var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
   name: {
       type: String,
       require: true
   },
    city: {
        type: String,
        require: true
    },
    players: {
        type: Number,
        require: true,
        default: 0
    },
    winings: {
        type: Number,
        require: false
    },
    
});

module.exports = mongoose.model('Team', teamSchema);