import { AuthService } from './auth.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserLoginInput } from 'src/modules/users/inputs/user-login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args('input') input: UserLoginInput): Promise<string> {
    return this.authService.login(input.identifier, input.password);
  }
}
