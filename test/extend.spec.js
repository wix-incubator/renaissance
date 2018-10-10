import { expect } from 'chai';
import { createGenericHandler, handler } from '../src/extend';

const myParams = { foo: 1 };
const somePayload = { bar: 2 };

describe('createGenericHandler', () => {
  it('should create a handler that receives params and then payload as arguments', () => {
    const myHandler = createGenericHandler('params', 'payload');
    const cb = (params, payload) => {
      expect(params.foo).to.equal(1);
      expect(payload.bar).to.equal(2);
    };
    myHandler(cb)(myParams)(somePayload);
  });
});

describe('handler', () => {
  it('should create a handler that receives payload and then params as arguments', () => {
    const cb = (payload, params) => {
      expect(params.foo).to.equal(1);
      expect(payload.bar).to.equal(2);
    };
    handler(cb)(myParams)(somePayload);
  });
});
