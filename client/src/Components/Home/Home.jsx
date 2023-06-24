import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from '../Countries/Countries';
import Details from '../Details/Details';
import Nav from '../Nav/Nav';
import Pagination from 'react-js-pagination';
import Styles from './Home.module.css';
import {
  sortCountriesByPopulation,
  sortCountriesAlphabetically,
  onSearching,
  loadCountries,
  fetchActivities,
} from '../../Redux/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, sel_country } from '../../Redux/actions';
import { useLocation } from 'react-router-dom';


const URL = 'http://localhost:3001';

function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const isLoading = useSelector((state) => state.isLoading);
  const activePage = useSelector((state) => state.activePage);
  const isSearchResults = useSelector((state) => state.isSearchResults);
  const searchResults = useSelector(state => state.searchResults);
  const activities = useSelector((state) => state.activities);
  const selectedCountry = useSelector((state) => state.selectedCountry);
  const [sortOrder, setSortOrder] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');  
  const [CountryID, setCountryID] = useState([]);


  useEffect(() => {
    if (isLoading) {
      loadcountries();
      findactivities();
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedActivity) {
        try {
          const response = await axios.get(`${URL}/activities/${selectedActivity}/countries`);
          setCountryID(response.data);
        } catch (error) {
          console.error(`Couldn't find countries with that activity`, error);
        }
      }
    };

    fetchData();
  }, [selectedActivity]);


  const findactivities = async () => {
    fetchActivities(dispatch);
  };

  const onSearch = (name) => {
    onSearching(name, dispatch);
  };

  const loadcountries = () => {
    loadCountries(dispatch);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const handleCountryClick = (country) => {
    dispatch(sel_country(country.id));
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    if (option === '') {
      return;
    }

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    dispatch(setPage(1));
  };

  const handleSortOrderChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    dispatch(setPage(1));
  };

  const handleContinentChange = (event) => {
    const continent = event.target.value;
    setSelectedContinent(continent);
    dispatch(setPage(1));
  };

  const handleActivityChange = (event) => {
    const activity = event.target.value;
    setSelectedActivity(activity);
    dispatch(setPage(1));
  };
  console.log(selectedCountry)

  const renderCountries = () => {
    let displayedCountries = countries;

    if (isSearchResults && !selectedCountry) {
      displayedCountries = searchResults;
    }
    
    if (selectedContinent && selectedActivity) {
      displayedCountries = countries.filter((country) => {
        return (
          country.continent === selectedContinent &&
          CountryID.includes(country.db_id)
        );
      });
    }

    else if (selectedContinent) {
      displayedCountries = displayedCountries.filter(
        (country) => country.continent === selectedContinent
      );

    }


    else if (selectedActivity) {
      displayedCountries = countries.filter(
        (country) => {
          return CountryID.includes(country.db_id)
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
        <ul>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="">Choose an option</option>
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>
        </ul>
        <ul>
          <label htmlFor="sortOrder">Order:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </ul>
        <ul>
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
        </ul>
        <ul>
          <label htmlFor="activity">Filter by Activity:</label>
          <select id="activity" value={selectedActivity} onChange={handleActivityChange}>
            <option value="">All</option>
            {activities.map((activity) => (
              <option key={activity.ID} value={activity.ID}>{activity.name}</option>
            ))}
          </select>
        </ul>
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


      {isSearchResults && (
        <div className={Styles.container} onClick={handleCountryClick} >
          {renderCountries()}
        </div>
      )}
      {selectedCountry && (
        <div className={Styles.selected}>
          <Details selectedCountry={selectedCountry} onClick={handleCountryClick} />
        </div>
      )}
    </div>
    
  );
}

export default Home;
