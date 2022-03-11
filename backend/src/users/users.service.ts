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
    return this.userRepo.findOne(filters);
  }

  async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    const qb = this.userRepo.createQueryBuilder('user');

    if (emailOrUsername) {
      qb.andWhere({ username: { $eq: emailOrUsername } });
      qb.orWhere({ email: { $eq: emailOrUsername } });
      qb.limit(1);
    }

    const response = await qb.getResult();

    return response[0];
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

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(dto.password, salt);

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
