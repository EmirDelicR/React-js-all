import { CART_ACTION_TYPES } from "./cart.types";

const toggleCart = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART
});

const addCartItem = item => ({
  type: CART_ACTION_TYPES.ADD_CART_ITEM,
  payload: item
});

const removeCartItem = item => ({
  type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
  payload: item
});

const clearItemFromCart = item => ({
  type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
  payload: item
});

export { toggleCart, addCartItem, clearItemFromCart, removeCartItem };
