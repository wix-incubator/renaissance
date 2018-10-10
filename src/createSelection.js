import get from 'lodash/get';

export default function createSelection(getState) {
  return path => {
    const state = getState();
    return get(state, path);
  };
}
