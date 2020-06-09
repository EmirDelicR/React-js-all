import { takeLatest, call, put } from 'redux-saga/effects';
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
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionFailure(err.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    SHOP_ACTION_TYPES.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
