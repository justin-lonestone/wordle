import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

interface AuthConfig {
  jwtSecret?: string;
}

export default registerAs(
  'auth',
  (): AuthConfig => ({
    jwtSecret: process.env.JWT_SECRET,
  }),
);
