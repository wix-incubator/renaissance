import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import middleware from '../src/middleware';
import reducer, { ACTIONS, INITIAL_STATE } from './testReducer';

describe('dispatch', () => {
  let store;
  const spy = sinon.spy();
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: ({ dispatch }) => () => {
        spy(ACTIONS.ONE);
        dispatch({ type: ACTIONS.TWO });
      },
    },
    [ACTIONS.TWO]: {
      handler: () => () => {
        spy();
      },
    },
  };

  function setup(mw) {
    store = createStore(
      reducer,
      INITIAL_STATE,
      applyMiddleware(middleware(mw)),
    );
  }

  beforeEach(() => {
    setup(myMiddleware);
  });

  it('should dispatch action', done => {
    store.dispatch({ type: ACTIONS.ONE });

    setTimeout(() => {
      expect(spy.calledTwice).to.be.true;
      done();
    });
  });
});
