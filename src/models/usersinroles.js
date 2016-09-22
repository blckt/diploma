module.exports = function ( sequelize, DataTypes ) {
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