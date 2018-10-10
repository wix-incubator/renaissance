import { expect } from 'chai';
import sinon from 'sinon';
import { setupStore, ACTIONS } from './testUtils';

describe('take all', () => {
  let spy, store;
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: () => {
        spy();
      },
    },
  };

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
          store = setupStore(myMiddleware);
        });

        it('should catch action', () => {
          runTest();
        });
      });
    });
  });
});
