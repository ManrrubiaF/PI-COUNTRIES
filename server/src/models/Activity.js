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
        tableName: 'Activity', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactiva la gestión automática de timestamps
    });

    return Activity;
};
