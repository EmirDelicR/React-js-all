import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Icon from './Icon';

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCart {
    toggleCart @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const IconContainer = () => (
  <Query query={GET_ITEM_COUNT}>
    {({ data: { itemCount } }) => (
      <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {(toggleCart) => <Icon toggleCart={toggleCart} itemCount={itemCount} />}
      </Mutation>
    )}
  </Query>
);

export default IconContainer;
