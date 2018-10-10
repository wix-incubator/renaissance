import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import middleware from '../src/middleware';
import reducer, { ACTIONS, INITIAL_STATE } from './testReducer';

describe('select', () => {
  let store;
  const spy = sinon.spy();
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: ({ select }) => () => {
        spy(select('prop'));
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

  it('should select from state', () => {
    store.dispatch({ type: ACTIONS.ONE });

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithExactly(INITIAL_STATE.prop));
  });
});
