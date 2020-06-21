import React from 'react';
import { connect } from 'react-redux';
import { toggleCart } from '../../../redux-state/cart/cart.actions';
import { selectCartItemsCount } from '../../../redux-state/cart/cart.selectors';

import './Icon.scss';
import { ReactComponent as ShoppingIcon } from '../../../assets/shopping-bag.svg';

const Icon = ({ toggleCart, itemCount }) => (
  <div className="cart-icon" onClick={toggleCart}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCart())
});

const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
