import React from 'react';
import './Item.scss';

import Button from '../../Form/Button/Button';

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

export default Item;
