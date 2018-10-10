import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import middleware from '../src/middleware';
import reducer, { ACTIONS, INITIAL_STATE } from './testReducer';

describe('take once', () => {
  let store, spy;
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: () => () => {
        spy();
      },
      takeOnce: true,
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
    spy = sinon.spy();
  });

  describe('take once', () => {
    beforeEach(() => {
      setup(myMiddleware);
    });

    it('should catch action once', () => {
      store.dispatch({ type: ACTIONS.ONE });

      expect(spy.calledOnce).to.be.true;

      store.dispatch({ type: ACTIONS.ONE });

      expect(spy.calledOnce).to.be.true;
    });
  });
});
