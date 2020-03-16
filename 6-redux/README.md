**_Some useful links:_**

- [Redux Docs](https://redux.js.org/)
- [Core Concepts](https://redux.js.org/introduction/core-concepts)
- [Actions](https://redux.js.org/basics/actions)
- [Reducers](https://redux.js.org/basics/reducers)
- [Redux FAQs](https://redux.js.org/faq)
- [Middleware](https://redux.js.org/advanced/middleware/)
- [redux-thunk package](https://github.com/gaearon/redux-thunk)
- [Async Actions](https://redux.js.org/advanced/async-actions)

## content

- [Redux](#redux)
- [Middleware](#middleware)
- [Dev Tools](#devtools)
- [Async in Redux](#async)

## redux

```console
npm i redux
```

Check redux-basic.js to see fundamentals how redux work

#### Create an store

```js
import { createStore, combineReducers } from "redux";
/* Implementation of reducers check in this files */
import counterReducer from "./reducers/counter";
import resultReducer from "./reducers/result";

/* CombineReducers just combine reducers and point to global state */
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});
const store = createStore(rootReducer);
```

#### Connect React and Redux

```console
npm i react-redux
```

```js
import { Provider } from "react-redux";
import store from "./store/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

#### Connect component with redux

```js
import { connect } from "react-redux";
/* Check container/Counter/Counter.js file*/
/*
 * mapStateToProps - is the function that map state to props that is pass to
 * connected component
 * mapDispatchToProps - is the function that map action function to props that is
 * pass to component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

[TOP](#content)

## middleware

Middleware is a function that you can hook into the process that is executed as part of the process and is not blocking or stop that process

```js
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

const store = createStore(
  rootReducer,
  applyMiddleware(logger))
);
```

[TOP](#content)

## devtools

You can install in browser addons

- Redux dev tools
- React dev tools

To setup **_redux_** dev tool

```js
import { compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);
```

[TOP](#content)

## async

Tp handle async request in redux install library **_redux-thunk_**

```console
npm i redux-thunk
```

```js
/* Setup */
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

/* How to use - create an action */
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
```

- Actions - Run Async code
- Reducer - Pure, Sync Code; Update the state

[TOP](#content)
