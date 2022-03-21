import { z } from 'zod';
import Form from '../../atoms/Form';
import { Button } from '@chakra-ui/button';
import FormInput from '../../atoms/FormInput';
import { Box, Link, Text } from '@chakra-ui/layout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../contexts/AuthContext';
import { useLoginMutation } from './LoginForm.generated';
import { useNavigate, Link as RouterLink, Navigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { token, setCurrentToken } = useAuth();
  const [login] = useLoginMutation();

  const loginSchema = z.object({
    identifier: z.string().nonempty('errors:form.required'),
    password: z.string()
  });

  type FormData = z.infer<typeof loginSchema>;

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data } = await login({ variables: { input: values } });

      if (data?.login && setCurrentToken) {
        setCurrentToken(data.login);
        navigate('/');
      }
    } catch (error: unknown) {
      console.error((error as Error).message);
    }
  });

  return token ? (
    <Navigate to="/" />
  ) : (
    <Form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="identifier"
        render={({ field: { ...props }, fieldState: { error } }) => {
          return (
            <FormInput type="text" error={error} {...props}>
              Identifiant
            </FormInput>
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { ...props }, fieldState: { error } }) => {
          return (
            <FormInput type="password" error={error} {...props}>
              Mot de passe
            </FormInput>
          );
        }}
      />
      <Box width="100%">
        <Button
          width="100%"
          isLoading={isSubmitting}
          type="submit"
          colorScheme={'blackAlpha'}
          mt={5}>
          Se connecter
        </Button>
        <Text mt={2.5}>
          Je n'ai pas de compte,{' '}
          <Link as={RouterLink} to="/register" color="teal.500">
            créer un compte
          </Link>
        </Text>
      </Box>
    </Form>
  );
};

export default LoginForm;
