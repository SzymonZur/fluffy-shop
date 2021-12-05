import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, ADD_QUANTITY, REMOVE_QUANTITY } from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const addQuantity = (payload) => {
  return {
    type: ADD_QUANTITY,
    payload,
  };
};

export const removeQuantity = (payload) => {
  return {
    type: REMOVE_QUANTITY,
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
