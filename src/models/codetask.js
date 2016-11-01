'use strict';
module.exports = function(sequelize, DataTypes) {
  var CodeTask = sequelize.define('CodeTask', {
    TaskName:{
      type: DataTypes.STRING,
      unique:true
    },
    Template: DataTypes.STRING,
    Description: DataTypes.STRING,
    TestCode: DataTypes.STRING,
    ExecuteNameSpace:DataTypes.STRING,
    ExecuteMethod:DataTypes.STRING,
    ExecuteClass:DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsToMany(models.User, {
          as        : 'Task',
          through   : models.UsersTasks,
          foreignKey: 'TaskId'
        });
      }
    }
  });
  return CodeTask;
};