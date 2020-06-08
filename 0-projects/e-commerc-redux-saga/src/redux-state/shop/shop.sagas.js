import { takeEvery } from 'redux-saga/effects';

import { SHOP_ACTION_TYPES } from './shop.types';

function* fetchCollectionsAsync() {
  yield console.log('I am fired');
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    SHOP_ACTION_TYPES.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
