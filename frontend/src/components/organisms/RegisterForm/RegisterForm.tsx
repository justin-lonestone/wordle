import { z } from 'zod';
import Form from '../../atoms/Form';
import { Button } from '@chakra-ui/button';
import FormInput from '../../atoms/FormInput';
import { Box, Link, Text } from '@chakra-ui/layout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../contexts/AuthContext';
import { useRegisterMutation } from './RegisterForm.generated';
import { useLoginMutation } from '../LoginForm/LoginForm.generated';
import { useNavigate, Link as RouterLink, Navigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { token, setCurrentToken } = useAuth();

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const resgisterSchema = z.object({
    email: z.string().email('errors:form.required').nonempty('errors:form.required'),
    username: z.string().nonempty('errors:form.required'),
    password: z.string()
  });

  type FormData = z.infer<typeof resgisterSchema>;

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(resgisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await register({ variables: { input: values } });

      const identifier = values.username;
      const password = values.password;

      const { data } = await login({ variables: { input: { identifier, password } } });

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
        name="email"
        render={({ field: { ...props }, fieldState: { error } }) => {
          return (
            <FormInput type="email" error={error} {...props}>
              Adresse e-mail
            </FormInput>
          );
        }}
      />
      <Controller
        control={control}
        name="username"
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
          Créer un compte
        </Button>
        <Text mt={2.5}>
          J'ai déjà un compte,{' '}
          <Link as={RouterLink} to="/login" color="teal.500">
            me connecter
          </Link>
        </Text>
      </Box>
    </Form>
  );
};

export default RegisterForm;
