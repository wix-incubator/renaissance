import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import middleware from '../src/middleware';
import reducer, { ACTIONS, INITIAL_STATE } from './testReducer';

describe('take all', () => {
  let store, spy;
  const myMiddleware = {
    [ACTIONS.ONE]: {
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
    spy = sinon.spy();
  });

  context('one middlware', () => {
    function runTest() {
      store.dispatch({ type: ACTIONS.ONE });

      expect(spy.calledOnce).to.be.true;

      store.dispatch({ type: ACTIONS.ONE });

      expect(spy.calledTwice).to.be.true;

      expect(store.getState()).to.deep.equal({ prop: ACTIONS.ONE });
    }

    [myMiddleware, [myMiddleware]].forEach(mw => {
      context(`middleware argument is ${typeof mw}`, () => {
        beforeEach(() => {
          setup(mw);
        });

        it('should catch action', () => {
          runTest();
        });
      });
    });
  });
});
