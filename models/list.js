'use strict';

var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
  id: Number,
  name: String,
  completed: {type: Boolean, default: false},
  note: String,
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('List', listSchema);
