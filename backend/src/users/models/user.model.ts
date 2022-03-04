import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  userId: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  isSubscribed?: boolean;
}
