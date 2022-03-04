import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;
}
