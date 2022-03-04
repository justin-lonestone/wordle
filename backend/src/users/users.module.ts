import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
