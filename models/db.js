var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017);

var db = new mongo.Db('Renrentou',server);

module.exports = db;

