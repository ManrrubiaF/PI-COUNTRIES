
export const sortCountriesByPopulation = (countries, sortOrder) => {
  const sortedCountries = [...countries];

  sortedCountries.sort((a, b) => {
    const populationA = a.population;
    const populationB = b.population;

    if (sortOrder === 'asc') {
      return populationA - populationB;
    } else if (sortOrder === 'desc') {
      return populationB - populationA;
    }

    return 0;
  });

  return sortedCountries;
};

export const sortCountriesAlphabetically = (countries, sortOrder) => {
  const sortedCountries = [...countries];

  sortedCountries.sort((a, b) => {
    const nameA = a.name.official.toUpperCase();
    const nameB = b.name.official.toUpperCase();

    if (sortOrder === 'asc') {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    } else if (sortOrder === 'desc') {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
    }

    return 0;
  });

  return sortedCountries;
};

export const selectCountries = (state) => state.countries.countries;
export const selectLoading = (state) => state.countries.loading;
export const selectSearchResults = (state) => state.countries.searchResults;
export const selectSelectedCountry = (state) => state.countries.selectedCountry;