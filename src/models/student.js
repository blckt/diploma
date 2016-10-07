'use strict';
module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    isGrant: DataTypes.BOOLEAN,
    isPrives: DataTypes.STRING,
    StudyType: DataTypes.STRING,
    Name: DataTypes.STRING,
    nmbInGroup: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          this.belongsTo(models.Group, {
            as: 'group',
            foreignKey: 'grpId'
          });
          this.hasMany(models.Sessions, {
            foreignKey: 'StudentId_FK',
            contraits: false
          });
        }
      }
    });
  return Student;
};
