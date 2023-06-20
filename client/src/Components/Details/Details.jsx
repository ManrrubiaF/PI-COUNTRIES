import style from "./Details.module.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost:3001';

function Details({ selectedCountry }) {
  const id = selectedCountry;
  const [country, setCountry] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios(`${URL}/countries/${id}`)
      .then(response => response.data)
      .then((data) => {
        if (data.id) {
          setCountry(data);
          fetchActivities(data.db_id);
        } else {
          window.alert('Error, please contact administration');
        }
      });
  }, [id]);

  const fetchActivities = (db_id) => {
    axios.get(`${URL}/activities/${db_id}/activities`)
      .then(response => response.data)
      .then((data) => {
        setActivities(data);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
      });
  };

  return (
    <div className={style.container}>
      <button>
        <Link to='/Home' className={style.link}>Back</Link>
      </button>

      {country.name ? (
        <div>
          <div>
            <h1>{country?.name.official.toString()}</h1>
          </div>

          <div className={style.detail}>
            <div className={style.containerImg}>
              <img src={country?.flag} alt={country?.name.official.toString()} />
            </div>

            <div>
              <label htmlFor="id">ID: </label>
              <p>{country?.id}</p>
              <label htmlFor="Name">Common Name: </label>
              <p>{country?.name.common.toString()}</p>
              <label htmlFor="Continent">Continent: </label>
              <p>{country?.continent}</p>
              <label htmlFor="Capital">Capital: </label>
              <p>{country?.capital}</p>
              <p>{country?.subregion?.subregion}</p>
              <label htmlFor="Area">Area: </label>
              <p>{country?.Area}</p>
              <label htmlFor="population">Population: </label>
              <p>{country?.population}</p>
            </div>
          </div>

          <div>
            <h2>Activities</h2>
            {activities.length > 0 ? (
              <ul>
                {activities.map((activity) => (
                  <li key={activity.id}>
                    <p>Name: {activity.name}</p>
                    <p>Difficulty: {activity.difficulty}</p>
                    <p>Duration: {activity.duration}</p>
                    <p>Season: {activity.season}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No activities found.</p>
            )}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Details;
