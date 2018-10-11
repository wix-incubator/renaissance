import ACTION_TYPES from './actions';

export const INITIAL_STATE = {
  query: '',
  results: [],
  isSearching: false,
  selectedMovie: null,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case ACTION_TYPES.CHANGE_SEARCH_VALUE:
      newState = { ...state, query: payload.query };
      break;
    case ACTION_TYPES.GET_RESULTS:
      newState = { ...state, isSearching: true };
      break;
    case ACTION_TYPES.RESULTS_SUCCESS:
      newState = { ...state, results: payload.results, isSearching: false };
      break;
    case ACTION_TYPES.RESULTS_ERROR:
      newState = { ...state, isSearching: false };
      break;
    case ACTION_TYPES.SELECT_MOVIE:
      const id = payload.id;
      newState = {
        ...state,
        selectedMovie:
          state.results.find(result => result.imdbID === id) || null,
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
