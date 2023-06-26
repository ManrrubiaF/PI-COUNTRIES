import Styles from "./Details.module.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backclick } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const URL = 'http://localhost:3001';

function Details({ selectedCountry }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  id  = selectedCountry;
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
          alert('Error, please contact administration');
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
  
  const Handleclick = () => {
    dispatch(backclick());
    navigate('/Home');
  }

  return (
    <div className={Styles.containerall} >
      <button className={Styles.button} onClick={Handleclick}>
        Back
      </button>
      {country.name ? (
        <div className={Styles.detailcontainer}>
          <div className={Styles.containercountry}>
            <div className={Styles.containerImg}>
              <h1>{country?.name.official.toString()}</h1>
              <img src={country?.flag} alt={country?.name.official.toString()} />
            </div>

            <div className={Styles.divdetail}>
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

          <div className={Styles.activitiycontainer}>
            <h2>Activities</h2>
            {activities.length > 0 ? (
              <ul key={activity.ID}>
                {activities.map((activity) => (
                  <li key={activity.ID}>
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
