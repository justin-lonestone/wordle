import { User } from './user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
