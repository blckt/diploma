'use strict';
module.exports = function(sequelize, DataTypes) {
  var UsersTasks = sequelize.define('UsersTasks', {
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UsersTasks;
};