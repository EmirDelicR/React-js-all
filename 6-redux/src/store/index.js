import { createStore, combineReducers, applyMiddleware, compose } from "redux";
/* Library for async code in redux */
import thunk from "redux-thunk";

import counterReducer from "./reducers/counter";
import resultReducer from "./reducers/result";

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

/* middleware - can use logger from redux */
const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching: ", action);
      const result = next(action);
      console.log("[Middleware] next state: ", store.getState());
      return result;
    };
  };
};

/* For redux dev tool */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

export default store;
