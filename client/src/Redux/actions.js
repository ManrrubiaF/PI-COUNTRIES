import { 
  SET_CONTINENT_FILTER, 
  SET_ACTIVITY_FILTER, 
  SET_SORT_ORDER, 
  SEARCH_COUNTRY, 
  LOAD_COUNTRIES,
  GET_ACTIVITIES,
  SET_PAGE,
  SELECTEDCOUNTRY,
  BACK_CLICK,
  } from './actions-types';

export const setContinentFilter = (filter) => ({
  type: SET_CONTINENT_FILTER,
  payload: filter,
});

export const setActivityFilter = (filter) => ({
  type: SET_ACTIVITY_FILTER,
  payload: filter,
});

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  payload: order,
});

export const searchCountry = (name) => {
  return {
    type: SEARCH_COUNTRY,
    payload: name
  };
};

export const LOADCOUNTRIES = (countries) => {
  return {
    type: LOAD_COUNTRIES,
    payload: countries,
  }
}

export const GETACTIVITIES = (activities) => {
  return {
    type: GET_ACTIVITIES,
    payload: activities,
  }
}

export const setPage = (pageNumber) => {
  return {
    type: SET_PAGE,
    payload: pageNumber,
  };
};

export const sel_country = (country) => {
  return{
    type: SELECTEDCOUNTRY,
    payload: country,
  }
}

export const backclick = () => {
  return {
    type: BACK_CLICK,
  }
}
