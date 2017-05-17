import cryptoMd5 from 'crypto-js/md5';

const API_PUBLIC = '298bab46381a6daaaee19aa5c8cafea5';
const API_PRIVATE = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
const BASE_URL = 'http://gateway.marvel.com';

export const FETCHED_HEROES = 'FETCHED_HEROES';
export const FETCHING_HEROES_ERROR = 'FETCHING_HEROES_ERROR';

export const FETCHING_INFO = 'FETCHING_INFO';
export const FETCHED_INFO = 'FETCHED_INFO';
export const FETCHING_INFO_ERROR = 'FETCHING_INFO_ERROR';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const fetchedHeroes = (json) => ({
  type: FETCHED_HEROES,
  result: json
});
const fetchingHeroesError = (err) => ({
  type: FETCHING_HEROES_ERROR
});

const fetchingInfo = () => ({
  type: FETCHING_INFO
});
const fetchedInfo = (json) => ({
  type: FETCHED_INFO,
  result: json
});
const fetchingInfoError = (err) => ({
  type: FETCHING_INFO_ERROR
});

const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const fetchHeroes = () => (dispatch) => {
  dispatch(clearErrors());

  const timestamp = Date.now();
  const toBeHashed = `${timestamp}${API_PRIVATE}${API_PUBLIC}`;

  const obj = {
    ts: timestamp,
    apikey: API_PUBLIC,
    hash: cryptoMd5(toBeHashed).toString()
  };

  return $.ajax(`${BASE_URL}/v1/public/characters`, {
    data: obj,
    contentType: 'application/json',
    type: 'GET'
  })
    .done((data) => {
      dispatch(fetchedHeroes(data.data.results));
    })
    .fail((jqObj, error, statusText) => {
      dispatch(fetchingHeroesError());
    });
};

export const fetchInfo = (id) => (dispatch) => {
  dispatch(clearErrors());

  dispatch(fetchingInfo());

  const timestamp = Date.now();
  const toBeHashed = `${timestamp}${API_PRIVATE}${API_PUBLIC}`;

  const obj = {
    ts: timestamp,
    apikey: API_PUBLIC,
    hash: cryptoMd5(toBeHashed).toString()
  };

  return $.ajax(`${BASE_URL}/v1/public/characters/${id}`, {
    data: obj,
    contentType: 'application/json',
    type: 'GET'
  })
    .done((data) => {
      dispatch(fetchedInfo(data.data.results[0]));
    })
    .fail((jqObj, error, statusText) => {
      dispatch(fetchingInfoError());
    });
};
