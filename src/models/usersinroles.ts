'use strict';
import { DataTypes, Sequelize } from 'sequelize';
module.exports = function ( sequelize: Sequelize, DataTypes: DataTypes ) {
    const UsersInRoles = sequelize.define( 'UsersInRoles', {
        UserId: DataTypes.INTEGER,
        RoleId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function ( models ) {
                // associations can be defined here
            }
        }
    } );
    return UsersInRoles;
};