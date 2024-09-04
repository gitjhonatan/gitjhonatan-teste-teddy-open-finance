import { MigrationInterface, QueryRunner } from 'typeorm';

export class DatabaseCreation1725166507641 implements MigrationInterface {
  name = 'DatabaseCreation1725166507641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS url_shortner`);
    await queryRunner.query(
      `CREATE TABLE "url_shortner"."url" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "url_origin" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "url_shortner"."user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "url_shortner"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`,
    );
    await queryRunner.query(`DROP TABLE "url_shortner"."user"`);
    await queryRunner.query(`DROP TABLE "url_shortner"."url"`);
    await queryRunner.query(`DROP SCHEMA url_shortner CASCADE;`);
  }
}
