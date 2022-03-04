import { AuthService } from './auth.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserLoginInput } from 'src/users/dtos/user-login.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args('input') input: UserLoginInput): Promise<string> {
    return this.authService.login(input.username, input.plainPassword);
  }
}
