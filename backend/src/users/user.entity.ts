import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@Entity()
@ObjectType()
export class User {
  @PrimaryKey({ type: 'uuid' })
  @Field(() => ID)
  id: string = v4();

  @Field()
  @Property({ unique: true })
  email!: string;

  @Field(() => String)
  @Property({ unique: true })
  username!: string;

  @Field()
  @Property()
  passwordHash!: string;

  @Field()
  @Property()
  passwordSalt!: string;

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  deletedAt!: Date | null;
}
