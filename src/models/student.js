'use strict';
module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        isGrant  : DataTypes.BOOLEAN,
        isPrives : DataTypes.STRING,
        StudyType: DataTypes.STRING,
        Name     : DataTypes.STRING,
        nmbInGroup:DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                this.belongsTo(models.Student, {
                    as        : 'Student',
                    through   : models.StudentsInGroups,
                    foreignKey: 'StudentId'
                });
            }
        }
    });
    return Student;
};
