import React, { Fragment, useEffect, useState } from "react";
/** REDUX */
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
/* API */
import { HTTP } from "../../plugins/axios";
/** COMPONENTS */
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export const BurgerBuilder = props => {
  const { onInitIngredients } = props;
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
      return;
    }
    props.onSetAuthRedirectPath("/checkout");
    props.history.push("/auth");
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = {
    ...props.ingredients
  };

  for (let key in disableInfo) {
    // { salad: true, meat: false ... }
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          price={props.price}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          purchasable={updatePurchaseState(props.ingredients)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
          disabled={disableInfo}
        />
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.ingredients,
    price: state.ingredients.totalPrice,
    error: state.ingredients.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, HTTP));
