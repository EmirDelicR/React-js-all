import { SHOP_ACTION_TYPES } from './shop.types';

export const updateCollections = (collectionMap) => ({
  type: SHOP_ACTION_TYPES.UPDATE_COLLECTION,
  payload: collectionMap,
});
