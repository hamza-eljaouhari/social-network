
'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var db        = {};

let obj =  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    },
    operatorsAliases: false,
    logging: false
};
    
const sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,obj);


fs
.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name.charAt(0).toUpperCase() + model.name.slice(1)] = model;
});
Object.keys(db).forEach(modelName => {
if (db[modelName].associate) {
    db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
