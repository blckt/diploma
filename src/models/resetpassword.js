'use strict';
module.exports = function(sequelize, DataTypes) {
  var resetPassword = sequelize.define('ResetPassword', {
    UUID: {
      type:DataTypes.UUID,
      primaryKey:true,
  },
    token:{
      type: DataTypes.STRING
  },
    isUsed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.User);
      }
    }
  });
  return resetPassword;
};