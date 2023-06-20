import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Countries from '../Countries/Countries';
import Details from '../Details/Details';
import Nav from '../Nav/Nav';
import Pagination from 'react-js-pagination';
import Styles from './Home.module.css';
import { sortCountriesByPopulation, sortCountriesAlphabetically } from '../../Redux/Utils';

const URL = 'http://localhost:3001';

function Home() {
  const location = useLocation();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isSearchResults, setIsSearchResults] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    if (location.pathname === '/Home') {
      loadCountries();
    }
  }, [location]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${URL}/activities`);
        setActivities(response.data);
      } catch (error) {
        console.error(`Couldn't load activities.`, error);
      }
    };

    fetchActivities();
  }, []);


  const onSearch = async (name) => {
    try {
      const { data } = await axios.get(`${URL}/countries/name?name=${name}`);
      if (data) {
        setCountries(data);
        setIsSearchResults(true);
        setSelectedCountry(null);
      }
    } catch (error) {
      alert(`That country doesn't exist or we don't have information about it.`);
    }
  };

  const loadCountries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL}/countries`);
      setCountries(response.data);
      setIsLoading(false);
      setSelectedCountry(null);
    } catch (error) {
      console.error(`Couldn't load countries.`, error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country.id);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    if (option === '') {
      return;
    }

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const handleSortOrderChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  const handleContinentChange = (event) => {
    const continent = event.target.value;
    setSelectedContinent(continent);
  };

  const handleActivityChange = (event) => {
    const activity = event.target.value;
    setSelectedActivity(activity);
  };

  const renderCountries = () => {
    let displayedCountries = countries;

    if (isSearchResults) {
      displayedCountries = countries;
    }

    if (selectedContinent) {
      displayedCountries = displayedCountries.filter(
        (country) => country.continent === selectedContinent
      );
    }
    

    if (selectedActivity) {
      displayedCountries = countries.filter((country) => {
        // Verificar si el país tiene la actividad seleccionada en la tabla intermedia
        return country.CountryActivities.some(
          (countryActivity) =>
            countryActivity.ActivityID === selectedActivity
        );
      });
    }
    

    if (sortOption) {
      if (sortOption === 'population') {
        displayedCountries = sortCountriesByPopulation(displayedCountries, sortOrder);
      } else if (sortOption === 'name') {
        displayedCountries = sortCountriesAlphabetically(displayedCountries, sortOrder);
      }
    }

    const itemsPerPage = 10;
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedCountries = displayedCountries.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div>
        <div className={Styles.container}>
          {!selectedCountry && (
            <Countries countries={paginatedCountries} onClick={handleCountryClick} />
          )}
        </div>
        <div className={Styles.pagination}>
          <ul className="pagination">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={displayedCountries.length}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={Styles.allview}>
      <Nav onSearch={onSearch} />

      <div className={Styles.filters}>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="">Choose an option</option>
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder">Order:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label htmlFor="continent">Filter by Continent:</label>
          <select id="continent" value={selectedContinent} onChange={handleContinentChange}>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
        <div>
          <label htmlFor="activity">Filter by Activity:</label>
          <select id="activity" value={selectedActivity} onChange={handleActivityChange}>
            <option value="">All</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>{activity.name}</option>
            ))}
          </select>
        </div>
      </div>

      {location.pathname === '/Home' && !selectedCountry && !isSearchResults && (
        <>
          {isLoading ? (
            <p>Loading countries...</p>
          ) : (
            <div className={Styles.container}>
              {renderCountries()}
            </div>
          )}
        </>
      )}

      {selectedCountry && (
        <div className={Styles.container}>
          <Details selectedCountry={selectedCountry} />
        </div>
      )}

      {isSearchResults && (
        <div className={Styles.container}>
          {renderCountries()}
        </div>
      )}
    </div>
  );
}

export default Home;
