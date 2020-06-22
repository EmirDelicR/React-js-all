import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { resolvers, typeDefs } from './resolvers';
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
  },
});
// client
//   .query({
//     query: gql`
//       {
//         getCollectionsByTitle(title: "hats") {
//           id
//           title
//           items {
//             id
//             name
//             price
//           }
//         }
//       }
//     `,
//   })
//   .then((res) => console.log(res));

export { client };
