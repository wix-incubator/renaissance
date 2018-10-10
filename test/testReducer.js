export const ACTIONS = {
  ONE: 'one',
  TWO: 'two',
};

export const INITIAL_STATE = {
  prop: 'some prop',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.ONE:
      state.prop = ACTIONS.ONE;
      break;
    case ACTIONS.TWO:
      state.prop = ACTIONS.TWO;
      break;
  }

  return state;
}
