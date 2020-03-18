import React, { useEffect, useReducer, useCallback } from "react";

import IngredientForm from "./Form/IngredientForm";
import IngredientList from "./List/IngredientList";
import Search from "./Search/Search";
import ErrorModal from "../UI/Modal/ErrorModal";

import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("This should not be reached");
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, allData, sendRequest, clear } = useHttp();

  const fetchDataFromServer = useCallback(async () => {
    await sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  useEffect(() => {
    if (allData) {
      dispatch({ type: "SET", ingredients: allData });
    }
  }, [allData]);

  const removeIngredientsHandler = id => {
    dispatch({ type: "DELETE", id: id });
  };

  const filterIngredientsHandler = filteredIngredients => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  };

  const addIngredientHandler = ingredient => {
    dispatch({
      type: "ADD",
      ingredient: { id: Math.random().toString(), ...ingredient }
    });
  };

  return (
    <div className="App">
      {error && (
        <ErrorModal
          onClose={() => {
            clear();
          }}
        >
          {error}
        </ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onSearchIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientsHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
