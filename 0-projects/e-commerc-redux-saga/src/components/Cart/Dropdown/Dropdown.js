import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectCartItems } from "../../../redux-state/cart/cart.selectors";
import { toggleCart } from "../../..//redux-state/cart/cart.actions";

import Button from "../../Form/Button/Button";
import Item from "../Item/Item";

import "./Dropdown.scss";

const Dropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length > 0 ? (
        cartItems.map(item => <Item key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <Button
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCart());
      }}
    >
      Checkout
    </Button>
  </div>
);

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});
export default withRouter(connect(mapStateToProps)(Dropdown));
