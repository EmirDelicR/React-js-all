**_Some useful links:_**

## content

- [Graphql](#graphql)

## Graphql

```console
npm i apollo-boost react-apollo graphql
```

```js
// in folder graphql/index.js
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';

const httpLink = createHttpLink({
  uri: 'link-to-graphql-endpoint',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

// Test the query
client
  .query({
    query: gql`
      {
        getCollectionsByTitle(title: "hats") {
          id
          title
          items {
            id
            name
            price
          }
        }
      }
    `,
  })
  .then((res) => console.log(res));

export { client };
```

```js
// in index.js
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
```

```js
// HOC pattern using Apollo
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
```

```js
// Fetch data using parameter
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './CollectionPage';
import Spinner from '../../components/Form/SimpleSpinner/SimpleSpinner';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);
```

#### Mutations

[Apollo Mutations](https://www.apollographql.com/docs/react/data/mutations/)

```js
// create file resolvers.js in graphql folder
import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

// cartHidden @client is looking in cache not on backend
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, _context, _info) => {
      const { cartHidden } = _context.cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      _context.cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },
  },
};

// in graphql/index.js file
import { resolvers, typeDefs } from './resolvers';

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});
```

[TOP](#content)
