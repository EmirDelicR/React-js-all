import React from "react";
import PropTypes from "prop-types";
import "./BurgerIngredient.css";
import { INGREDIENTS } from "../../../utils/constants";

const burgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className="BreadBottom"></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className="BreadTop">
          <div className="Seeds1"></div>
          <div className="Seeds2"></div>
        </div>
      );
      break;
    case INGREDIENTS.meat:
      ingredient = <div className="Meat"></div>;
      break;
    case INGREDIENTS.cheese:
      ingredient = <div className="Cheese"></div>;
      break;
    case INGREDIENTS.bacon:
      ingredient = <div className="Bacon"></div>;
      break;
    case INGREDIENTS.salad:
      ingredient = <div className="Salad"></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
