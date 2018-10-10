import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import middleware from '../src/middleware';
import reducer, { ACTIONS, INITIAL_STATE } from './testReducer';

describe('params', () => {
  let store;
  const myParams = {
    foo: {
      doit: sinon.spy(),
    },
  };
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: ({ params }) => () => {
        params.foo.doit();
      },
    },
  };

  function setup(mw) {
    store = createStore(
      reducer,
      INITIAL_STATE,
      applyMiddleware(middleware(mw, myParams)),
    );
  }

  beforeEach(() => {
    setup(myMiddleware);
  });

  it('should receive params as args', () => {
    store.dispatch({ type: ACTIONS.ONE });

    expect(myParams.foo.doit.calledOnce).to.be.true;
  });
});
