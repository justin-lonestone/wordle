import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserFiltersInput {
  @Field(() => String, { nullable: true })
  search?: string;
}
