[Enzyme API](http://airbnb.io/enzyme/docs/api/)

[Jest Docs](https://facebook.github.io/jest/)

### Redux saga

[Redux Saga: Full Documentation](https://redux-saga.js.org/)

[Advanced Concepts](https://redux-saga.js.org/docs/advanced/)

[API Reference](https://redux-saga.js.org/docs/api/)

[Pros & Cons for Redux Saga vs Thunks](https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es2017-asy/34933395)

Redux saga is alternative for redux-thunk to run async (side effect) code in reducers/actions

```console
npm i redux-saga
```

Check folder store/sagas

```js
import { put } from "redux-saga/effects";
import * as actionTypes from "../actions/auth/types";

/** Generator function */
export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");

  yield put({
    type: actionTypes.AUTH_LOGOUT
  });
}

/* in store/index.js where you create a store */
import createSagaMiddleware from "redux-saga";
import { watchAuth } from "./sagas/";

const sagaMiddleware = createSagaMiddleware();
const allMiddleware = [logger, thunk, sagaMiddleware];
/* After store creation */
sagaMiddleware.run(watchAuth);
```

To hook saga in actions do this

```js
// in store/actions/auth/types
export const AUTH_INITIATE_LOGOUT = "AUTH_INITIATE_LOGOUT";
// in store/actions/auth/auth.actions.js
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

// in sagas/index.js
import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/auth/types";
import { logoutSaga } from "./auth";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
```
