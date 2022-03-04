import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dtos/create-user.dto';
import { UpdateUserInput } from './dtos/update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { UserFiltersInput } from './dtos/user-filters.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}

  async getById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ id });
  }

  async findOne(filters: FilterQuery<User>): Promise<User | null> {
    console.log('filters: ', filters);
    return this.userRepo.findOne(filters);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findOne({ username });
  }

  async findMany(filters: UserFiltersInput): Promise<User[]> {
    const qb = this.userRepo.createQueryBuilder('user');

    if (filters.search) {
      qb.andWhere({
        username: {
          $ilike: `%${filters.search}%`,
        },
      });
    }

    return qb.getResult();
  }

  async create(dto: CreateUserInput): Promise<User> {
    const user = new User();

    user.email = dto.email;
    user.username = dto.username;

    user.passwordSalt = await bcrypt.genSalt();
    user.passwordHash = await bcrypt.hash(dto.plainPassword, user.passwordSalt);

    await this.userRepo.persistAndFlush(user);

    return user;
  }

  async update(user: User, dto: UpdateUserInput): Promise<User> {
    wrap(user).assign({
      email: dto.email || user.email,
      username: dto.username || user.username,
    });

    await this.userRepo.persistAndFlush(user);

    return user;
  }

  async delete(user: User): Promise<User> {
    user.deletedAt = new Date();

    await this.userRepo.persistAndFlush(user);

    return user;
  }
}
