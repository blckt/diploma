'use strict';
module.exports = function(sequelize, DataTypes) {
  var Exams = sequelize.define('Exams', {
    ExamName:DataTypes.STRING,
    Balone:DataTypes.STRING,
    Type:DataTypes.STRING,
    Normal:DataTypes.STRING,
    Char:DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Sessions,{
            as:'Exam',
            foreignKey:'Session_ID'
        })
      }
    }
  });
  return Exams;
};