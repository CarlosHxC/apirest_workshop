'use strict';

var mongoose = require('mongoose');
var Team = mongoose.model('Team');

exports.addTeam(req, res) {
    var team = new Team(req.body);
    
    team.save(function(err) {
        if(err)
            console.log(err.message);
        res.send(200).message('Added');
    })
}

