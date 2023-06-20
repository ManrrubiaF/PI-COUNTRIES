const { conn } = require('../db')
const Activity = require('../models/Activity')(conn);
const CountryActivities = require('../models/CountryActivities')(conn)

const CreateActivity = async (req, res) => {
    console.log('por entrar al try');
    try {
        console.log('entre al try');
        const { name, difficulty, duration, Season, countries } = req.body;
        console.log('hasta aca bien');
        console.log(name , difficulty , duration , Season , countries);

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            Season,
        });
        

        const countryActivityPromises = countries.map(countryId => {
            console.log(`Creating relationship for countryId: ${countryId}`);
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
