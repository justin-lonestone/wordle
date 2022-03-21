import React from 'react';
import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import RegisterForm from '../organisms/RegisterForm/RegisterForm';

const Register = () => {
  return (
    <Container maxW={'container.xl'}>
      <Center h={'100vh'}>
        <VStack spacing={5} align="stretch">
          <Heading>Créer un compte</Heading>
          <RegisterForm />
        </VStack>
      </Center>
    </Container>
  );
};

export default Register;
