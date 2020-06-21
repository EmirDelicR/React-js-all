import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  removeCartItem,
  addCartItem
} from "../../../redux-state/cart/cart.actions";

import "./Item.scss";

const Item = ({
  item,
  clearItemFromCart,
  removeItemFromCart,
  addItemFromCart
}) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={item.imageUrl} alt="Item" />
    </div>
    <span className="name">{item.name}</span>
    <span className="quantity">
      <div className="arrow" onClick={() => removeItemFromCart(item)}>
        &#10094;
      </div>
      <span className="value">{item.quantity}</span>
      <div className="arrow" onClick={() => addItemFromCart(item)}>
        &#10095;
      </div>
    </span>
    <span className="price">{item.price}</span>
    <div className="remove-button" onClick={() => clearItemFromCart(item)}>
      &#10008;
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  clearItemFromCart: item => dispatch(clearItemFromCart(item)),
  removeItemFromCart: item => dispatch(removeCartItem(item)),
  addItemFromCart: item => dispatch(addCartItem(item))
});

export default connect(null, mapDispatchToProps)(Item);
