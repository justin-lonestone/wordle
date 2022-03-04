import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  isSubscribed?: boolean;
}
