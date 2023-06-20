const { Router } = require("express");
const { getAllCountries } = require('../controllers/getallcountries');
const { getCountryById } = require('../controllers/getCountryById');
const { CreateActivity } = require('../controllers/postactivity');
const { getActivity } = require('../controllers/getactivities');
const { getCountryByName } = require('../controllers/getCountryByName');
const { firstload } = require('../utils/countries');
const { getCountryByActivity } = require('../controllers/getCountrysByActivity');
const { getActivityByCountry } = require('../controllers/getActivitiesByCountry');
const router = Router();

router.get('/countries', getAllCountries);
router.get('/countries/name', getCountryByName);
router.get('/firstload', firstload);
router.get('/countries/:id', getCountryById);
router.get('/activities/:activityId/countries', getCountryByActivity);
router.get('/activities', getActivity);
router.get('/activities/:countryId/activities', getActivityByCountry);
router.post('/activities', CreateActivity);

module.exports = router;

