import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
} from "../constants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      let actualState;
      state.forEach((x) => {
        if (x.product.id === addedProduct.product.id) {
          if (x.product.size === addedProduct.product.size) {
            x.quantity += 1;
            return (actualState = [...state]);
          } else {
            return [...state, action.payload];
          }
        }
      });
      if (actualState) {
        return actualState;
      } else {
        return [...state, action.payload];
      }
    case ADD_QUANTITY:
      state.forEach((cartItem) => {
        if (cartItem.product.id == action.payload.product.id)
          cartItem.quantity += 1;
      });
      return [...state];
    case REMOVE_QUANTITY:
      state.forEach((cartItem) => {
        if (cartItem.product.id == action.payload.product.id)
          if (cartItem.quantity > 1) cartItem.quantity -= 1;
      });
      return [...state];
    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
    case CLEAR_CART:
      return (state = []);
  }
  return state;
};

export default cartItems;
