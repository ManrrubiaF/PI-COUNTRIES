import React from 'react';
import Styles from './Country.module.css';

function Country({ country, onClick }) {
  
  const handleCountryClick = () => {
    onClick(country);
  };

  return (
    <div className={Styles.card} onClick={handleCountryClick}>
      <div className={Styles.country}>
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
