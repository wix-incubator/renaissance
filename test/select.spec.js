import { expect } from 'chai';
import sinon from 'sinon';
import { ACTIONS, INITIAL_STATE, setupStore } from './testUtils';

describe('select', () => {
  let store;
  const spy = sinon.spy();
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: (action, { select }) => {
        spy(select('prop'));
      },
    },
  };

  beforeEach(() => {
    store = setupStore(myMiddleware);
  });

  it('should select from state', () => {
    store.dispatch({ type: ACTIONS.ONE });

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithExactly(INITIAL_STATE.prop));
  });
});
