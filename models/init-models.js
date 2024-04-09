var DataTypes = require("sequelize").DataTypes;
var ___efmigrationshistory = require("./__efmigrationshistory");
var _cats = require("./cats");
var _dogs = require("./dogs");
var _people = require("./people");

function initModels(sequelize) {
  var __efmigrationshistory = ___efmigrationshistory(sequelize, DataTypes);
  var cats = _cats(sequelize, DataTypes);
  var dogs = _dogs(sequelize, DataTypes);
  var people = _people(sequelize, DataTypes);


  return {
    __efmigrationshistory,
    cats,
    dogs,
    people,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
