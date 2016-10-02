'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    Number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsToMany(models.Student, { as: 'Student', through: models.StudentsInGroups, foreignKey: 'GroupId' });
      }
    }
  });
  return Group;
};