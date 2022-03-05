import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';
dotenv.config();

const options: MikroOrmModuleSyncOptions = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'postgresql',
  host: process.env['DB_HOST'] ?? 'localhost',
  dbName: process.env['DB_NAME'] ?? 'wordle',
  user: process.env['DB_USERNAME'] ?? '',
  password: process.env['DB_PASSWORD'],
  validate: true,
  strict: true,
  metadataProvider: TsMorphMetadataProvider,
  debug: process.env.NODE_ENV !== 'production',
};

export default options;
