import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const INITIAL_STATE = {
  results: []
};

const deleteResult = (state, action) => {
  // One way
  // const id = 2;
  // const newArray = [...state.results];
  // newArray.splice(id, 1);
  // better way
  const updatedArray = state.results.filter(
    result => result.id !== action.resultElId
  );
  return updateObject(state, { results: updatedArray });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {
        results: state.results.concat({ id: new Date(), value: action.result })
      });
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    default:
      return state;
  }
};

export default reducer;
