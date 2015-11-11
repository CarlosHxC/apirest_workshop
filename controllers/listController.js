'use strict';

var mongoose = require('mongoose');
var List = mongoose.model('List');

exports.addItem = function(req, res, next) {
  var item = new List();
  item.name = req.body.name;
  item.note = req.body.note;

  List.aggregate([{
    $group: {
      _id: "$name",
      max: { $max: "$id" }
    }
  }], function(err, data) {
    if(err)
      console.log(err);
    if(data.length == 0) {
      item.id = 0;
    } else {
      item.id = Number(data[0].max) + 1;
    }
    item.save(function(err) {
      if(err)
        console.log(err);
      res.send("item added");
    });
  });

}

exports.findAll = function(req, res, next) {
  List.find({}, function(err, data) {
    if(err)
      console.log(err);
    console.log(data);
    res.send(data);
  })
}

exports.itemFinished = function(req, res, next) {
  var conditions = {completed: true, updated_at: Date.now};
  List.update({id: req.body.id}, conditions, {upsert: true}, function(err) {
    console.log("item updated");
    res.send("updated");
  });
}

exports.deleteItem = function(req, res, next) {
  List.findOneAndRemove({id: req.body.id}, function(err) {
    if(err) {
      console.log(err);
    }
    res.send("deleted");
  });
}
