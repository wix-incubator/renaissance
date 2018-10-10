import { expect } from 'chai';
import sinon from 'sinon';
import { setupStore, ACTIONS } from './testUtils';

describe('dispatch', () => {
  let store;
  const spy = sinon.spy();
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: (action, { dispatch }) => {
        spy(ACTIONS.ONE);
        dispatch({ type: ACTIONS.TWO });
      },
    },
    [ACTIONS.TWO]: {
      handler: () => {
        spy();
      },
    },
  };

  beforeEach(() => {
    store = setupStore(myMiddleware);
  });

  it('should dispatch action', done => {
    store.dispatch({ type: ACTIONS.ONE });

    setTimeout(() => {
      expect(spy.calledTwice).to.be.true;
      done();
    });
  });
});
