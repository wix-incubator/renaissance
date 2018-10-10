import createWaiters from './helpers/createWaiters';
import createSelection from './helpers/createSelection';

const TAKEN_PROP = '__renaissanceActionTaken';

export default function middleware(config = [], params = {}) {
  const middlewares = config.length >= 0 ? config : [config];
  const allHandlers = {};
  const waiters = {};
  const handlerArgs = {
    params,
    forAction: createWaiters(waiters),
  };

  function callHandlers(action) {
    const { type } = action;
    const waiting = waiters[type];

    if (allHandlers[type]) {
      allHandlers[type].forEach(({ handler, takeOnce }) => {
        if (!takeOnce || !handler[TAKEN_PROP]) {
          handler(action, handlerArgs);
          handler[TAKEN_PROP] = true;
        }
      });
    }

    if (waiting) {
      waiting.forEach(waiter => {
        waiter(action);
      });

      delete waiters[type];
    }
  }

  middlewares.forEach(mw => {
    Object.keys(mw).forEach(actionType => {
      const handler = mw[actionType];

      if (!allHandlers[actionType]) {
        allHandlers[actionType] = [handler];
      } else {
        allHandlers[actionType].push(handler);
      }
    });
  });

  return ({ getState, dispatch }) => next => action => {
    if (!handlerArgs.select) {
      handlerArgs.select = createSelection(getState);
      handlerArgs.dispatch = dispatch;
    }

    const nextState = next(action);
    callHandlers(action);
    return nextState;
  };
}
