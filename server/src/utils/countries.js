const axios = require('axios');
const { conn } = require('../db');
const { Country } = require('../db.js');
const { getPngUrl } = require('../utils/utils');

async function fetchCountriesData() {
  try {
    const response = await axios.get('http://localhost:5000/countries');
    const countries = response.data;
    return countries;
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
    return [];
  }
}

async function firstload() {
  try {

    const countries = await fetchCountriesData();

    for (const country of countries) {
      const { cca3, name, capital, subregion, area, population, continents, flags } = country;

      let subregionValue = null;
      if (subregion !== undefined && subregion !== null) {
        subregionValue = subregion;
      }

      let capitalValue = null;
      if (capital !== undefined && capital !== null) {
        capitalValue = capital[0];
      }
      let areaValue = null;
      if (area !== undefined && area !== null) {
        areaValue = area;
      }

      await Country.create({
        ID: cca3,
        name: {
          common: name.common,
          official: name.official,
        },
        capital: capitalValue,
        subregion: subregionValue,
        area: areaValue,
        population,
        continents: continents[0],
        flag: getPngUrl(flags),
      });
    }

    console.log('Datos incrustados correctamente');
  } catch (error) {
    console.error('Error al incrustar los datos:', error);
  } 
}

module.exports = {
  firstload,
};
