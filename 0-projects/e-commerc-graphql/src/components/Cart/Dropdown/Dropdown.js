import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../Form/Button/Button';
import Item from '../Item/Item';

import './Dropdown.scss';

const Dropdown = ({ cartItems, history, toggleCart }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length > 0 ? (
        cartItems.map((item) => <Item key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <Button
      onClick={() => {
        history.push('/checkout');
        toggleCart();
      }}
    >
      Checkout
    </Button>
  </div>
);

export default withRouter(Dropdown);
