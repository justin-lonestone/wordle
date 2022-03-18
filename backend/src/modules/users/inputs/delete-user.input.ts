import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  id!: string;
}
