import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  emailOrUsername?: string;

  @Field()
  plainPassword!: string;
}
