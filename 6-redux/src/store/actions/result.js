import * as actionTypes from "./types";

export const deleteResult = id => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: id
  };
};

export const saveResult = result => {
  return {
    type: actionTypes.STORE_RESULT,
    result: result
  };
};

export const storeResult = result => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // use getState only if necessary change logic in reducers
      // const oldCounter = getState().ctr.counter;
      // console.log(oldCounter);
      dispatch(saveResult(result));
    }, 2000);
  };
};
