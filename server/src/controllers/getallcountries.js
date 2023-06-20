const { conn } = require('../db');
const  Country  = require('../models/Country')(conn);


let countries_array = [];

const getAllCountries = async (req, res) => {
  try {
    const data = await Country.findAll();

    if (data.length === 0) {
      throw Error('No countries found');
    }

    countries_array = [];

    data.forEach((country) => {
      const one_country = {
        db_id: country.db_id,
        id: country.ID,
        name: {
          common: country.name.common,
          official: country.name.official,
        },
        capital: country.capital,
        region: country.subregion,
        continent: country.continents,
        population: country.population,
        Area: country.area,
        flag: country.flag,
      };

      countries_array.push(one_country);
    });

    return res.status(200).json(countries_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCountries,
};
