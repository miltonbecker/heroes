import * as actions from './actions';
import { combineReducers } from 'redux';

const heroes = (state = [], action) => {
  switch (action.type) {
    case actions.FETCHED_HEROES:
      return [
        ...action.result
      ];
    default:
      return state;
  }
};

const fetchingHeroesError = (state = false, action) => {
  switch (action.type) {
    case actions.FETCHING_HEROES_ERROR:
      return true;
    case actions.CLEAR_ERRORS:
      return false;
    default:
      return state;
  }
};

const info = (state = null, action) => {
  switch (action.type) {
    case actions.FETCHING_INFO:
      return null;  
    case actions.FETCHED_INFO:
      return action.result;
    default:
      return state;
  }
};

const fetchingInfoError = (state = false, action) => {
  switch (action.type) {
    case actions.FETCHING_INFO_ERROR:
      return true;
    case actions.CLEAR_ERRORS:
      return false;
    default:
      return state;
  }
};

const heroesApp = combineReducers({
  heroes,
  fetchingHeroesError,
  info,
  fetchingInfoError
});

export default heroesApp;