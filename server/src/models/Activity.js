const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Activity = sequelize.define('Activity', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Season: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Activity',
        timestamps: false, 
    });

    return Activity;
};
