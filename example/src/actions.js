const types = {
  CHANGE_SEARCH_VALUE: 'CHANGE_SEARCH_VALUE',
  GET_RESULTS: 'GET_RESULTS',
  RESULTS_SUCCESS: 'RESULTS_SUCCESS',
  RESULTS_ERROR: 'RESULTS_ERROR',
  SELECT_MOVIE: 'SELECT_MOVIE',
};

export default types;

export const actions = Object.keys(types).reduce((res, key) => {
  res[key] = payload => ({
    type: types[key],
    payload,
  });
  return res;
}, {});
