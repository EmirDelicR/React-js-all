import { createSelector } from "reselect";

const currentCart = state => state.cart;

const selectCartItems = createSelector([currentCart], cart => cart.cartItems);

const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

const selectCartHiddenStatus = createSelector(
  [currentCart],
  cart => cart.isCartHidden
);

const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

export {
  selectCartItems,
  selectCartItemsCount,
  selectCartHiddenStatus,
  selectCartTotal
};
