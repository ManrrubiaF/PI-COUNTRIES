import Country from './Country';
import React from 'react';
import Styles from './Countries.module.css';

export default function Countries({ countries, isSearchResults, onClick }) {
    return (
        <div className={Styles.container}>
            {countries.map(({ db_id, id, name, capital, subregion, area, continent, flag, population }) => {
                const key = isSearchResults ? `search-${db_id}` : `country-${db_id}`;
                return (
                    <Country
                        key={key}
                        country={{
                            id,
                            name,
                            capital,
                            subregion,
                            area,
                            continent,
                            flag,
                            population,
                            
                        }}
                        onClick={onClick}
                    />
                )
            })}
        </div>
    )
}
