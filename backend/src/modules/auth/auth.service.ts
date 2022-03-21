import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';
import { UserLoginInput } from './inputs/user-login.input';

export type AuthPayload = { sub: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: UserLoginInput): Promise<string> {
    const identifier = input.identifier;
    const user = await this.userService.findByEmailOrUsername(identifier);

    if (
      !user ||
      !user.password ||
      !bcrypt.compareSync(input.password, user.password)
    ) {
      throw new UserInputError('WRONG_CREDENTIALS');
    }

    return this.jwtService.sign({ sub: user.id });
  }
}
