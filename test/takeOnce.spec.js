import { expect } from 'chai';
import sinon from 'sinon';
import { setupStore, ACTIONS } from './testUtils';

describe('take once', () => {
  let store, spy;
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: () => {
        spy();
      },
      takeOnce: true,
    },
  };

  beforeEach(() => {
    spy = sinon.spy();
  });

  describe('take once', () => {
    beforeEach(() => {
      store = setupStore(myMiddleware);
    });

    it('should catch action once', () => {
      store.dispatch({ type: ACTIONS.ONE });

      expect(spy.calledOnce).to.be.true;

      store.dispatch({ type: ACTIONS.ONE });

      expect(spy.calledOnce).to.be.true;
    });
  });
});
