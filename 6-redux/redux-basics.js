/**
 * This file is only to show fundamentals with redux as standalone
 * To execute this file run: node redux-basics.js
 *
 * */

/* node JS import type */
const redux = require("redux");

/** Pointer to createStore function from redux */
const createStore = redux.createStore;

const INITIAL_STATE = {
  counter: 0
};

/* Reducer */
const rootReducer = (state = INITIAL_STATE, action) => {
  /** You can use switch case here */
  if (action.type === "INC_COUNTER") {
    /** Use ... to copy state to make it immutable */
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
};

/* Store */
const store = createStore(rootReducer);
console.log(store.getState());

/* Subscription -> argument is function that is executed when the state is changed */
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

/* Dispatching Action (must pass type rest is optional) */
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log(store.getState());
