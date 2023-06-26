const { conn } = require('../db');
const Activity = require('../models/Activity')(conn);
const CountryActivities = require('../models/CountryActivities')(conn);

const CreateActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, Season, countries } = req.body;

        let activity;

        const existingActivity = await Activity.findOne({ name });
        if (!existingActivity) {
            
            activity = await Activity.create({
                name,
                difficulty,
                duration,
                Season,
            });
        } else {
            activity = existingActivity;
        }

        const countryActivityPromises = countries.map(countryId => {
            return CountryActivities.create({
                CountryDbId: countryId,
                ActivityId: activity.ID,
            });
        });

        await Promise.all(countryActivityPromises);

        return res.status(201).json(activity);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    CreateActivity
};
