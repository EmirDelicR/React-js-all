import React from 'react';
import { connect } from 'react-redux';
import './Item.scss';

import Button from '../../Form/Button/Button';

import { addCartItem } from '../../../redux-state/cart/cart.actions';

const Item = ({ item, addCartItem }) => {
  return (
    <div className="collection-item">
      <div
        className="background-image-wrap"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      ></div>
      <div className="footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>
      <Button inverted onClick={() => addCartItem(item)}>
        Add to Cart
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addCartItem: item => dispatch(addCartItem(item))
});

export default connect(null, mapDispatchToProps)(Item);
