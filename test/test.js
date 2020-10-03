var assert = require('assert');
let config = require('../config/config.json')
let mongoose = require('mongoose');

mongoose.connect(config.DB_TEST, {useNewUrlParser: true});
var db = mongoose.connection;

