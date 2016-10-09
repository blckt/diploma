'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sessions = sequelize.define('Sessions', {
    avg: DataTypes.STRING,
    startYear:DataTypes.INTEGER,
    endYear:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
            this.belongsTo(models.Student,{
                as:'Student',
                foreignKey:'StudentId_FK'
            });
            this.hasMany(models.Exams,{
                foreignKey:'Session_ID'
            });
      }
    }
  });
  return Sessions;
};