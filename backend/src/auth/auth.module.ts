import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: '' + process.env.JWT_SECRET,
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthResolver, AuthService],
})
export class AuthModule {}
