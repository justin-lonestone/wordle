import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../organisms/LoginForm/LoginForm';

const Login = () => {
  return (
    <Container maxW={'container.xl'}>
      <Center h={'100vh'}>
        <VStack spacing={5} align="stretch">
          <Heading>Se connecter</Heading>
          <LoginForm />
        </VStack>
      </Center>
    </Container>
  );
};

export default Login;
