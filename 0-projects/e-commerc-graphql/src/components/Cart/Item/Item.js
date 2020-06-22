import React from 'react';
import './Item.scss';

const Item = ({ item }) => (
  <div className="cart-item">
    <img src={item.imageUrl} alt="Cart item" />
    <div className="item-details">
      <span className="name">{item.name}</span>
      <span className="price">
        {item.quantity} x ${item.price}
      </span>
    </div>
  </div>
);

export default Item;
