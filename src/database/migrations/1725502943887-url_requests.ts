import { MigrationInterface, QueryRunner } from 'typeorm';

export class UrlRequests1725502943887 implements MigrationInterface {
  name = 'UrlRequests1725502943887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url_requests" DROP CONSTRAINT "FK_5f94752a84d5a53ef25f7584d43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url_requests" ADD CONSTRAINT "FK_5f94752a84d5a53ef25f7584d43" FOREIGN KEY ("urlId") REFERENCES "url_shortner"."url"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url_requests" DROP CONSTRAINT "FK_5f94752a84d5a53ef25f7584d43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "url_shortner"."url_requests" ADD CONSTRAINT "FK_5f94752a84d5a53ef25f7584d43" FOREIGN KEY ("urlId") REFERENCES "url_shortner"."url"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
