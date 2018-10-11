import ACTIONS from './actions';

const OMDB_KEY = '56dbe3cf';

async function onSearchTermChange(action, { params, dispatch }) {
  const { axios } = params;
  const { payload } = action;
  const { query } = payload;

  if (query) {
    try {
      dispatch({ type: ACTIONS.GET_RESULTS });
      const result = await axios.get('/', {
        params: {
          apikey: OMDB_KEY,
          s: query,
          type: 'movie',
          page: 1,
        },
      });
      dispatch({
        type: ACTIONS.RESULTS_SUCCESS,
        payload: { results: result.data.Search || [] },
      });
    } catch (e) {
      dispatch({ type: ACTIONS.RESULTS_ERROR, payload: e });
    }
  }
}

export default {
  [ACTIONS.CHANGE_SEARCH_VALUE]: {
    handler: onSearchTermChange,
  },
};
