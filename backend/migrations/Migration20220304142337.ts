import { Migration } from '@mikro-orm/migrations';

export class Migration20220304142337 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "password_hash" varchar(255) not null, "password_salt" varchar(255) not null, "deleted_at" timestamptz(0) null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
