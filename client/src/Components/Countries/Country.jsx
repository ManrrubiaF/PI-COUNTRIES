import React from 'react';
import Styles from './Country.module.css';
import { useNavigate } from 'react-router-dom';

function Country({ country, onClick }) {

  const navigate = useNavigate();

  const handleCountryClick = () => {
    onClick(country);
    navigate('/Home');
  };

  return (
    <div className={Styles.card} >
      <div className={Styles.country} onClick={handleCountryClick}>
        <div className={Styles.flag}>
          {country.flag && <img src={country.flag} alt={country.name.common.toString()} />}
        </div>
        <h2>Official Name: {country.name.official.toString()}</h2>
        <h2>Continent: {country.continent}</h2>
      </div>
    </div>
  );
}

export default Country;
