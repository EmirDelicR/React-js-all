import { updateObject } from "../../../utils/helpers";
import { INGREDIENT_PRICES } from "./constants";

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients ? action.ingredients.salad : 0,
      bacon: action.ingredients ? action.ingredients.bacon : 0,
      cheese: action.ingredients ? action.ingredients.cheese : 0,
      meat: action.ingredients ? action.ingredients.meat : 1
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

export { addIngredient, removeIngredient, setIngredients };
