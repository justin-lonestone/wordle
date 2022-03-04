import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import mikroConfig from './mikro-orm.config';
import authConfig from './auth/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    MikroOrmModule.forRoot(mikroConfig),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      uploads: false,
      autoSchemaFile: join(process.cwd(), 'src', 'graphql', 'schema.gql'),

      formatError(error) {
        console.error(error, error.path?.join('.'));
        return error;
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
