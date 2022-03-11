import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Input,
  VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation Login($input: UserLoginInput!) {
    login(input: $input)
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    emailOrUsername: '',
    password: '',
    name: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      input: { emailOrUsername: formState.emailOrUsername, plainPassword: formState.password }
    },
    onCompleted: ({ login }) => {
      console.log(login);
      localStorage.setItem(AUTH_TOKEN, login);
      navigate('/');
    }
  });

  const [signup] = useMutation(LOGIN_MUTATION, {
    variables: {
      input: { emailOrUsername: formState.emailOrUsername, plainPassword: formState.password }
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login);
      navigate('/');
    }
  });

  return (
    <Container maxW={'container.xl'}>
      <Center h={'100vh'}>
        <VStack spacing={5} align="stretch">
          <Heading>{formState.login ? 'Se connecter' : 'Créer un compte'}</Heading>
          <VStack spacing={5}>
            <FormControl isRequired>
              {!formState.login && (
                <Input
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      name: e.target.value
                    })
                  }
                  type="text"
                  placeholder="Votre nom d'utilisateur"
                />
              )}
            </FormControl>

            <FormControl>
              <Input
                value={formState.emailOrUsername}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    emailOrUsername: e.target.value
                  })
                }
                type="text"
                placeholder={
                  !formState.login ? 'Votre adresse email' : "Adresse email ou nom d'utilisateur"
                }
              />
              <FormHelperText>
                Veuillez entrer votre adresse email ou nom d'utilisateur
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <Input
                value={formState.password}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    password: e.target.value
                  })
                }
                type="password"
                placeholder="Mot de passe"
              />
            </FormControl>
          </VStack>
          <HStack spacing={5}>
            <Button onClick={formState.login ? login : signup}>
              {formState.login ? 'Se connecter' : 'Créer un compte'}
            </Button>
            <Button
              onClick={(e) =>
                setFormState({
                  ...formState,
                  login: !formState.login
                })
              }>
              {formState.login ? 'Créer un compte' : "J'ai déjà un compte"}
            </Button>
          </HStack>
        </VStack>
      </Center>
    </Container>
  );
};

export default Login;
