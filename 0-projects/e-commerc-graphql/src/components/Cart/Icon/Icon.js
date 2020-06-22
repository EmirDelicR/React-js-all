import React from 'react';
import './Icon.scss';
import { ReactComponent as ShoppingIcon } from '../../../assets/shopping-bag.svg';

const Icon = ({ toggleCart, itemCount }) => (
  <div className="cart-icon" onClick={toggleCart}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

export default Icon;
