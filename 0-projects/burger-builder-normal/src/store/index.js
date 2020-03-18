import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { ingredientReducer, orderReducer, authReducer } from "./reducers/index";
import { watchAuth } from "./sagas/";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const allMiddleware = [logger, thunk, sagaMiddleware];

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...allMiddleware))
);

sagaMiddleware.run(watchAuth);

export default store;
