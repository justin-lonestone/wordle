import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteUserInput {
  @Field()
  @IsNotEmpty()
  userId: string;
}
