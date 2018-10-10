export default function createWaiters(waiters) {
  return types =>
    new Promise(resolve => {
      if (typeof types === 'string') {
        types = [types];
      }

      if (types.length) {
        types.forEach(type => {
          if (!waiters[type]) {
            waiters[type] = [];
          }

          waiters[type].push(resolve);
        });
      }
    });
}
