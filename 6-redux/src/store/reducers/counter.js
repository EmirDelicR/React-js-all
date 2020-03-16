import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const INITIAL_STATE = {
  counter: 0
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObject(state, { counter: state.counter + 1 });
    case actionTypes.DECREMENT:
      return updateObject(state, { counter: state.counter - 1 });
    case actionTypes.ADD:
      return updateObject(state, { counter: state.counter + action.value });
    case actionTypes.SUBTRACT:
      return updateObject(state, { counter: state.counter - action.value });
    default:
      return state;
  }
};

export default reducer;
