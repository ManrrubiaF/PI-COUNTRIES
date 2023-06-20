const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

  const CountryActivities = sequelize.define('CountryActivities', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CountryDbId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ActivityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return CountryActivities;
};

