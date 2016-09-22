'use strict';
module.exports = function ( sequelize, DataTypes ) {
    const Roles = sequelize.define( 'Roles', {
        RoleName: DataTypes.STRING
    }, {
        classMethods: {
            associate: function ( models ) {
                // associations can be defined here
               this.belongsToMany( models.User, { as: 'User', through: models.UsersInRoles, foreignKey: 'RoleId' } );
            }
        }
    } );
    return Roles;
};