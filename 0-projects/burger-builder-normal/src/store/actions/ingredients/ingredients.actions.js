import * as actionTypes from "./types";
import { makeApiRequest, isResponseSuccess } from "../../../utils/api/api";
import { API_REQUEST_TYPES, API_REQUEST_URLS } from "../../../utils/constants";

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
  };
};

/**
 *  Setup for Async call to fetch ingredients
 */
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async dispatch => {
    const response = await makeApiRequest(
      API_REQUEST_URLS.ingredients,
      API_REQUEST_TYPES.get
    );

    if (!isResponseSuccess(response)) {
      console.error("Error: ", response);
      dispatch(fetchIngredientsFailed());
      return;
    }

    dispatch(setIngredients(response.data));
  };
};
