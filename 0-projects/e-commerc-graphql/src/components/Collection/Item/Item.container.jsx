import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import Item from './Item';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const ItemContainer = (props) => (
  <Mutation mutation={ADD_ITEM_TO_CART}>
    {(addItemToCart) => (
      <Item
        {...props}
        addCartItem={(item) => addItemToCart({ variables: { item } })}
      />
    )}
  </Mutation>
);

export default ItemContainer;
