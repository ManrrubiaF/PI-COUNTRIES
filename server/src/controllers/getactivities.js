require('dotenv').config;
const { conn } = require('../db');
const Activity = require('../models/Activity')(conn);

const getActivity = async (req,res) => {
    try {
        const activities = await Activity.findAll();
        return res.status(200).json(activities)
        
    } catch (error) {
        return res.status(500).json(error.message);
        
    }

}

module.exports = {
    getActivity
}