import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';

export type JwtPayload = { sub: string };

export type AuthPayload = JwtPayload;

export interface LoggedInUser {
  readonly token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(emailOrUsername: string, plainPassword: string): Promise<string> {
    const user = await this.userService.findByEmailOrUsername(emailOrUsername);

    if (
      !user ||
      !user.passwordHash ||
      !bcrypt.compareSync(plainPassword, user.passwordHash)
    ) {
      throw new UserInputError('WRONG_CREDENTIALS');
    }

    const payload: JwtPayload = { sub: user.id };

    return this.jwtService.sign(payload);
  }
}
