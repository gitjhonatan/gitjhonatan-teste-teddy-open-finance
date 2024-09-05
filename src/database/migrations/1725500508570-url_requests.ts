import { MigrationInterface, QueryRunner } from 'typeorm';

export class UrlRequests1725500508570 implements MigrationInterface {
  name = 'UrlRequests1725500508570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "url_shortner"."url_requests" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "urlId" uuid, CONSTRAINT "PK_bca6dd144f235e836597ba57e4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url_requests" ADD CONSTRAINT "FK_5f94752a84d5a53ef25f7584d43" FOREIGN KEY ("urlId") REFERENCES "url_shortner"."url"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url_requests" DROP CONSTRAINT "FK_5f94752a84d5a53ef25f7584d43"`,
    );
    await queryRunner.query(`DROP TABLE "url_shortner"."url_requests"`);
  }
}
