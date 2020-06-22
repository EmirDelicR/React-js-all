import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Overview from './Overview';
import SimpleSpinner from '../../Form/SimpleSpinner/SimpleSpinner';

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const OverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {({ loading, error, data }) => {
      console.log('QRAPHQL collection query');
      if (loading) return <SimpleSpinner />;
      return <Overview collections={data.collections} />;
    }}
  </Query>
);

export default OverviewContainer;
