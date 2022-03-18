import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { NotFoundError } from '@mikro-orm/core';
import { UpdateUserInput } from './inputs/update-user.input';
import { DeleteUserInput } from './inputs/delete-user.input';
import { UserFiltersInput } from './inputs/user-filters.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') dto: CreateUserInput): Promise<User> {
    return this.userService.create(dto);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('input') dto: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.userService.findOne({ id: dto.id });

    if (!userToUpdate) {
      throw new NotFoundError('USER_NOT_FOUND');
    }

    return this.userService.update(userToUpdate, dto);
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('input') dto: DeleteUserInput): Promise<User> {
    const userToDelete = await this.userService.findOne({ id: dto.id });
    if (!userToDelete) {
      throw new NotFoundError('USER_NOT_FOUND');
    }

    return this.userService.delete(userToDelete);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundError('USER_NOT_FOUND');
    }

    return user;
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  users(@Args('filters') filters: UserFiltersInput): Promise<User[]> {
    return this.userService.findMany(filters);
  }
}
