import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector([selectShop], shop => shop);

export const selectCollectionsForPreview = createSelector([selectShop], shop =>
  Object.keys(shop).map(key => shop[key])
);

export const selectShopCollection = collectionUrlParam => {
  return createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
  );
};
