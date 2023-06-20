const { conn } = require('../db');
const { Op } = require('sequelize');
const Country = require('../models/Country')(conn);


const getCountryByName = async (req, res) => {
  
    try {
      
        const { name } = req.query;
        const data = await Country.findAll({
            where: {
                [Op.or]: [
                    { 'name.common': { [Op.iLike]: `%${name}%` } },
                    { 'name.official': { [Op.iLike]: `%${name}%` } },
                ],
            },
        });


        if (data.length === 0) {
            throw new Error(`Country with Name: ${name} is not in our database`);
        }


        const countries_array = data.map(country => ({
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
        }));

        return res.status(200).json(countries_array);
    } catch (error) {

      return res.status(500).send(error.message);
    }
}

module.exports = {
    getCountryByName,
};
