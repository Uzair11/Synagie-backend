/* eslint-disable @typescript-eslint/no-var-requires */
const Sequelize = require('sequelize');
const Mongoose = require('mongoose');
const nconf = require('nconf');


const mysqlConfig = nconf.get('mysql');
const sequelize = new Sequelize(mysqlConfig.dbName, mysqlConfig.username, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: 'mysql',
    port: mysqlConfig.port,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const mongoConfig = nconf.get('mongo');
const mongoUrl = mongoConfig.uri ||
    'mongodb://' + (mongoConfig.host || 'localhost') + ':' + (mongoConfig.port || '27017') + `/${mongoConfig.dbName}`;
Mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(
    () => console.log('Mongo Connected!!', mongoUrl),
    (err) => console.log(err)
);

module.exports = sequelize;
