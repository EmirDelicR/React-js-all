import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { ingredientReducer, orderReducer, authReducer } from "./reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const allMiddleware = [logger, thunk];

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...allMiddleware))
);

export default store;
