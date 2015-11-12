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
    res.send(data);
  })
}

exports.itemFinished = function(req, res, next) {
  var change = req.body.state;
  var changed;
  console.log("change" + change);
  if(change == "true") {
    changed = false;
    console.log("true " + changed);
    List.update({id: req.body.id}, {completed: false}, {upsert: true}, function(err) {
      if(err)
        console.log(err);
      console.log("item updated false");
      res.send("updated");
    });
  } else {
    changed = true;
    console.log("false " + changed);
    List.update({id: req.body.id}, {completed: true}, {upsert: true}, function(err) {
      if(err)
        console.log(err);
      console.log("item updated true");
      res.send("updated");
    });
  }

}

exports.deleteItem = function(req, res, next) {
  List.findOneAndRemove({id: req.body.id}, function(err) {
    if(err) {
      console.log(err);
    }
    res.send("deleted");
  });
}
