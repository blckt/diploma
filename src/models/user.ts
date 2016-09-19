"use strict";
import { DataTypes, Sequelize, Model, DefineAttributeColumnOptions } from 'sequelize';
import { hashSync, compareSync } from 'bcrypt';
const SALT_ROUND = 10;


module.exports = function ( sequelize: Sequelize, DataTypes: DataTypes ) {
    var User = sequelize.define( 'User', {
        login: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            set: function ( password ) {
                this.setDataValue( 'password', hashSync( password, SALT_ROUND ) );
            }
        }
    }, {
        hooks: {
            beforeCreate: function ( user, fn ) {

            }
        },
        classMethods: {
            associate: function ( models ) {
                // associations can be defined here
                this.belongsToMany( models.Roles, { as: 'Role', through: models.UsersInRoles, foreignKey: 'UserId' } );
            }
        },
        instanceMethods: {
            validatePassword: function ( password ) {
                return compareSync( password, this.getDataValue( 'password' ) );
            },

        }
    } );

    const HashedRoles = {};
    HashedRoles[ 'USER' ] = function () {
        this.setRole( 'USER' );
    };

    return User;
};


