var mongo = require('mongodb'),
    server = new mongo.Server('localhost',27017),
    db = new mongo.Db('Renrentou',server);
module.exports = db;