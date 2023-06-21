const { Activity, CountryActivities, conn } = require('../db');

const getActivityByCountry = async (req, res) => {
  try {
    const { db_id } = req.params;
    console.log(`me llegó ${db_id}`)

    const countryActivities = await CountryActivities.findAll({
      where: {
        CountryDbId: db_id,
      },
      include: [Activity],
    });
    console.log("sali de la consulta.")

    const activitiesArray = countryActivities.map((countryActivity) => {
      const { id, name, difficulty, duration, Season } = countryActivity.Activity;
      return { id, name, difficulty, duration, season: Season };
    });

    return res.status(200).json(activitiesArray);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getActivityByCountry,
};
