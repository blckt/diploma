'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    Number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Student,{
          foreignKey:'grpId',
          contraits:false,
        })
      }
    }
  });
  return Group;
};
