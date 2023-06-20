const { conn } = require('../db');
const Country = require('../models/Country')(conn);
require('dotenv').config();
const { Op } = require('sequelize');

const getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const data = await Country.findAll({
            where: {
                ID: {
                    [Op.eq]: id.toUpperCase(),
                },
            },
        });
        
        

        if (data.length === 0) {
            throw Error(`Country with ID: ${id} is not in our database`);
        }
        const country = data[0].dataValues;

        const countryById = {
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
        return res.status(200).json(countryById)        

    } catch (error) {

        console.error(error);
        return error.message.includes('ID')
            ? res.status(404).send(error.message)
            : res.status(500).send(error.response)
    }
}


module.exports = {
    getCountryById,
};