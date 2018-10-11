import { createStore, applyMiddleware } from 'redux';
import middleware from '../src';

export const ACTIONS = {
  ONE: 'one',
  TWO: 'two',
};

export const INITIAL_STATE = {
  prop: 'some prop',
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.ONE:
      state.prop = ACTIONS.ONE;
      break;
    case ACTIONS.TWO:
      state.prop = ACTIONS.TWO;
      break;
    default:
      break;
  }

  return state;
}

export function setupStore(mw, params) {
  return createStore(
    reducer,
    INITIAL_STATE,
    applyMiddleware(middleware(mw, params)),
  );
}
