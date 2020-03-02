const Sequelize = require('sequelize');


const connection = new Sequelize("contestado", "contestado", "dragon10", {
    host: "mysql669.umbler.com",
    dialect: "mysql",
    timezone: "-03:00"
})
/*
 
pool: {
    max: 7,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },em caso de Unhandled rejection SequelizeConnectionError tente isso e reze */

module.exports = connection;
