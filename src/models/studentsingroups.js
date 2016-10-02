'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentsInGroups = sequelize.define('StudentsInGroups', {
    StudentId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return StudentsInGroups;
};