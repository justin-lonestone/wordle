import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '../../atoms/Form';
import { useNavigate } from 'react-router';
import FormInput from '../../atoms/FormInput';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useAuth } from '../../atoms/AuthProvider';

const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();

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
      await auth.login(values, () => {
        navigate('/', { replace: true });
      });
    } catch (error: unknown) {
      console.error((error as Error).message);
    }
  });

  return (
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
      </Box>
    </Form>
  );
};

export default LoginForm;
