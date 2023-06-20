import { SET_CONTINENT_FILTER, SET_ACTIVITY_FILTER, SET_SORT_ORDER } from './actionTypes';

const initialState = {
  continentFilter: '',
  activityFilter: '',
  sortOrder: 'asc',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTINENT_FILTER:
      return {
        ...state,
        continentFilter: action.payload,
      };
    case SET_ACTIVITY_FILTER:
      return {
        ...state,
        activityFilter: action.payload,
      };
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
