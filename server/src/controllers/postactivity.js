const { conn } = require('../db')
const Activity = require('../models/Activity')(conn);
const CountryActivities = require('../models/CountryActivities')(conn)

const CreateActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, Season, countries } = req.body;
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            Season,
        });
        
        const countryActivityPromises = countries.map(countryId => {
            return CountryActivities.create({
                CountryDbId: countryId,
                ActivityId: newActivity.ID,
            });
        });

        await Promise.all(countryActivityPromises);

        return res.status(201).json(newActivity);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    CreateActivity
};
