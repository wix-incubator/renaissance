import { expect } from 'chai';
import sinon from 'sinon';
import { ACTIONS, setupStore } from './testUtils';

describe('params', () => {
  let store;
  const myParams = {
    foo: {
      doit: sinon.spy(),
    },
  };
  const myMiddleware = {
    [ACTIONS.ONE]: {
      handler: (action, { params }) => {
        params.foo.doit();
      },
    },
  };

  beforeEach(() => {
    store = setupStore(myMiddleware, myParams);
  });

  it('should receive params as args', () => {
    store.dispatch({ type: ACTIONS.ONE });

    expect(myParams.foo.doit.calledOnce).to.be.true;
  });
});
