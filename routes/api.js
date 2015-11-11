'use strict';

var express = require('express');
var router = express.Router();

var listController = require('../controllers/listController.js');

router.post('/addItem', listController.addItem);
router.get('/findAll', listController.findAll);
router.post('/updateItem', listController.itemFinished);
router.post('/removeItem', listController.deleteItem);

module.exports = router;
