'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api_test');

exports.connection = mongoose.connection;