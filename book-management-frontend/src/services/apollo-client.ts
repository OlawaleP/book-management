import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const apiUrl = import.meta.env.VITE_APP_API_URL
const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  // You can add authentication headers here if required.
  return {
    headers: {
      ...headers,
      // Add authentication headers here (e.g., authorization token).
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;