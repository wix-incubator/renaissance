import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import middleware from '../src/middleware';
import reducer, { ACTIONS, INITIAL_STATE } from './testReducer';

describe('forAction', () => {
  let store;
  const spy = sinon.spy();
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: ({ forAction }) => async () => {
        spy(ACTIONS.ONE);
        const payload = await forAction(ACTIONS.TWO);
        spy(payload);
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

  it('should wait for action', done => {
    store.dispatch({ type: ACTIONS.ONE });

    expect(spy.calledOnce).to.be.true;
    expect(spy.getCall(0).args[0]).to.equal(ACTIONS.ONE);

    store.dispatch({ type: ACTIONS.TWO });

    setTimeout(() => {
      expect(spy.calledTwice).to.be.true;
      expect(spy.getCall(1).args[0]).to.deep.equal({ type: ACTIONS.TWO });
      done();
    });
  });
});
