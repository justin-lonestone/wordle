import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import client from '../modules/apollo/apolloClient';
import AuthProvider from './atoms/AuthProvider';
import Router from './pages/Router';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
