import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Dropdown from './Dropdown';

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCart {
    toggleCart @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const DropdownContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCart) => (
      <Query query={GET_CART_ITEMS}>
        {({ data: { cartItems } }) => (
          <Dropdown cartItems={cartItems} toggleCart={toggleCart} />
        )}
      </Query>
    )}
  </Mutation>
);

export default DropdownContainer;
