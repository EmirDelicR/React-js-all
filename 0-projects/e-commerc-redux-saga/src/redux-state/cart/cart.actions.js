import { CART_ACTION_TYPES } from './cart.types';

export const toggleCart = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART,
});

export const addCartItem = (item) => ({
  type: CART_ACTION_TYPES.ADD_CART_ITEM,
  payload: item,
});

export const removeCartItem = (item) => ({
  type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CART_ACTION_TYPES.CLEAR_CART,
});
