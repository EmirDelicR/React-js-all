import * as actionTypes from "../../actions/ingredients/types";
import { updateObject } from "../../../utils/helpers";
import { addIngredient, setIngredients, removeIngredient } from "./utils";

const INITIAL_STATE = {
  ingredients: null,
  totalPice: 4,
  error: false
};

const ingredientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export { ingredientReducer };
