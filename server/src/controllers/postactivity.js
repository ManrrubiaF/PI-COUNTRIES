const { Activity, CountryActivities, conn } = require('../db');

const CreateActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, Season, countries } = req.body;
        let activity;

        const existingActivity = await Activity.findOne({ 
            where: { name },
            raw: true });
        if (!existingActivity) {
            
            activity = await Activity.create({
                name,
                difficulty,
                duration,
                Season,
            });
            await activity.reload();
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