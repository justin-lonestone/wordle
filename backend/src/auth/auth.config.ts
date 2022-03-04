import { registerAs } from '@nestjs/config';

interface AuthConfig {
  jwtSecret?: string;
}

export default registerAs(
  'auth',
  (): AuthConfig => ({
    jwtSecret: 'secret', // + process.env.JWT_SECRET,
  }),
);
