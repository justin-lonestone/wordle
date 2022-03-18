import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  identifier?: string;

  @Field()
  password!: string;
}
