import { SET_CONTINENT_FILTER, SET_ACTIVITY_FILTER, SET_SORT_ORDER } from './actions-types';

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
