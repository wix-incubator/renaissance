export function createGenericHandler(...props) {
  return cb => params => payload => {
    const args = { params, payload };
    return cb(...props.map(prop => args[prop]));
  };
}

export const handler = createGenericHandler('payload', 'params');
