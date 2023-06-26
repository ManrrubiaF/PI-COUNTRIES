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


const initialState = {
  continentFilter: '',
  activityFilter: '',
  sortOrder: 'asc',
  countries: [],
  isSearchResults: false,
  activePage: 1,
  selectedContinent: '',
  selectedActivity: '',
  sortOption: '',
  sortOrder: '',
  isLoading: true,
  activities: [],
  searchResults: [],
  selectedCountry: '',
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
    case SEARCH_COUNTRY:
      return {
        ...state,
        searchResults: action.payload,
        isSearchResults: true,
        activePage: 1,
        isLoading: false,
      };
    case LOAD_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        isSearchResults: false,
        isLoading: false,
        activePage: 1,
        selectedContinent: '',
        selectedActivity: '',
        sortOption: '',
        sortOrder: '',
        selectedCountry: '',
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        isSearchResults: false,
        isLoading: false,
        activePage: 1,
        selectedContinent: '',
        selectedActivity: '',
        sortOption: '',
        sortOrder: '',
        selectedCountry: '',
      }
    case SET_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case SELECTEDCOUNTRY:
      return {
        ...state,
        selectedCountry: action.payload,
        searchResults: [],
        isLoading: false,
        isSearchResults: false,
        
      }
    case BACK_CLICK:
      return {
        ...state,
        isLoading: true,
        isSearchResults: false,
        selectedCountry: '',
        
      }

    default:
      return state;
  }
};

export default reducer;
