export const addItemToCart = (cartItems, cartItemToAdd) => {
  const isItemInCart = cartItems.find(item => item.id === cartItemToAdd.id);

  if (!isItemInCart) {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }

  return cartItems.map(item => {
    return item.id === cartItemToAdd.id
      ? { ...item, quantity: item.quantity + 1 }
      : item;
  });
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter(item => item.id !== cartItemToRemove.id);
  }

  return cartItems.map(item => {
    return item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};
