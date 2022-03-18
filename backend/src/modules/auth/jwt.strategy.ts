import { UsersService } from '../users/users.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthPayload } from './auth.service';
import { ConfigType } from '@nestjs/config';
import authConfig from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly _authConfig: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _authConfig.jwtSecret,
    });
  }

  async validate(validationPayload: AuthPayload): Promise<User | null> {
    return await this.userService.findOne({ id: validationPayload.sub });
  }
}
