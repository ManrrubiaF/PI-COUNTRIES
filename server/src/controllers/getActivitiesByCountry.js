require('dotenv').config();
const { conn } = require('../db');
const { CountryActivities, Activity } = require('../models/Activity')(conn);

const getActivityByCountry = async (req, res) => {
  try {
    const { db_id } = req.params;

    const activitiesForCountry = await CountryActivities.findAll({
      where: {
        CountryDbId: db_id,
      },
      include: [Activity], 
    });

    const activitiesArray = activitiesForCountry.map((activity) => {
      const { id, name, difficulty, duration, season } = activity.Activity; 
      return { id, name, difficulty, duration, season };
    });

    return res.status(200).json(activitiesArray);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getActivityByCountry,
};
