**_Some useful links:_**

## content

- [Store data from JSON to firebase](#json-to-firebase)
- [Redux-saga](#redux-saga)
- [Generators](#generators)
- [Take, TakeEvery, TakeLast](#saga-effect)

## Json To Firebase

[TOP](#content)

```js
// in firebase/utils

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocumentRef = collectionRef.doc();
    console.log(obj);
    batch.set(newDocumentRef, obj);
  });

  return await batch.commit();
};

// in App.js file
import {
  addCollectionsAndDocuments,
} from '../../firebase/utils';
import { selectCollectionsForPreview } from '../../redux-state/shop/shop.selectors';

componentDidMount() {
  const { collectionArray } = this.props;

  addCollectionsAndDocuments(
    'collections',
    collectionArray.map(({ title, items }) => ({ title, items }))
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  collectionArray: selectCollectionsForPreview(state),
});
```

## Redux Saga

```console
npm i redux-saga
```

```js
// in store/sate/redux-state
import createSagaMiddleware from 'redux-saga';
import { fetchCollectionsStart } from './shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

sagaMiddleware.run(fetchCollectionsStart);

// create file shop.saga.js
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/utils';
import { SHOP_ACTION_TYPES } from './shop.types';
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';

function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // call function is similar to await
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // put function is dispatch
    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionFailure(err.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    SHOP_ACTION_TYPES.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
```

[TOP](#content)

## Generators

```js
function* gen(num) {
  yield num;
  yield num + 10;
  return 25;
}

const g = gen(5);
console.log(g.next());
// { "value": 5, "done": false }
console.log(g.next());
// { "value": 15, "done": false }
console.log(g.next());
// { "value": 25, "done": true }
```

[TOP](#content)

## Saga Effect

#### take

Take is reusing generator so that means it wait until first is finish then trigger other call

```js
import { take } from 'redux-saga/effects';
export *function incrementSaga() {
  yield take('ACTION')
}
```

#### takeEvery

TakeEvery is not reusing generator so that means it trigger new function on every call

```js
import { takeEvery } from 'redux-saga/effects';
export *function incrementSaga() {
  yield takeEvery('ACTION', cb)
}
```

#### takeLatest

TakeLatest is only use last call (cancel all previous)

```js
import { takeLatest } from 'redux-saga/effects';
export *function incrementSaga() {
  yield takeLatest('ACTION', cb)
}
```

[TOP](#content)
