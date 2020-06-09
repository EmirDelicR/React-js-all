import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/utils';
import { SHOP_ACTION_TYPES } from './shop.types';

export const fetchCollectionStart = () => ({
  type: SHOP_ACTION_TYPES.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (collectionsMap) => ({
  type: SHOP_ACTION_TYPES.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionFailure = (message) => ({
  type: SHOP_ACTION_TYPES.FETCH_COLLECTIONS_FAILURE,
  payload: message,
});

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionStart());

    collectionRef
      .onSnapshot(async (snapshot) => {
        const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSuccess(collectionsMap));
      })
      .catch((err) => dispatch(fetchCollectionFailure(err.message)));
  };
};
