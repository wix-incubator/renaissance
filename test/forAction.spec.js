import { expect } from 'chai';
import sinon from 'sinon';
import { ACTIONS, setupStore } from './testUtils';

describe('forAction', () => {
  let store;
  const spy = sinon.spy();
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: async (action, { forAction }) => {
        spy(ACTIONS.ONE);
        const payload = await forAction(ACTIONS.TWO);
        spy(payload);
      },
    },
  };

  beforeEach(() => {
    store = setupStore(myMiddleware);
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
