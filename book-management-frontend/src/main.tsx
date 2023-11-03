import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App.tsx'
import theme from './theme'
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import './index.css'
import client from './services/apollo-client.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
    <Auth0Provider
      domain= 'dev-pyr8cpaizj7nnwvp.us.auth0.com'
    clientId='PgvzYMDkR86z6s5VP1AaSRBy7G41O7hj'
      authorizationParams={{redirect_uri: window.location.origin }}
  >
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </ChakraProvider>
    </Auth0Provider>
    </ApolloProvider>
  // </React.StrictMode>,
)
