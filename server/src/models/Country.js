const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Country = sequelize.define('Country', {
    name: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'Country'
  });

  return Country;
};
