const { conn } = require('../db');
const CountryActivities = require('../models/CountryActivities')(conn);
const Country = require('../models/Country')(conn);

const getCountryByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const countryActivities = await CountryActivities.findAll({
      where: {
        ActivityId: activityId,
      },
    });


    const countryIds = countryActivities.map((CountryAct) => CountryAct.CountryDbId);


    const countries = await Country.findAll({
      where: {
        db_id: countryIds,
      },
    });

    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getCountryByActivity,
};
