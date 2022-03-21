import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import client from '../modules/apollo/apolloClient';
import Router from '../router/Router';

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
