import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndHolidayEntity1743523683436
  implements MigrationInterface
{
  name = 'AddUserAndHolidayEntity1743523683436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "holiday" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "countryCode" text NOT NULL, "year" integer NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_3e7492c25f80418a7aad0aec053" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_holidays_holiday" ("userId" uuid NOT NULL, "holidayId" uuid NOT NULL, CONSTRAINT "PK_97ee001d5c5408bc4bd32a64810" PRIMARY KEY ("userId", "holidayId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_12b545a6aeab62420e59c048fd" ON "user_holidays_holiday" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_992d7ded99a3f36362f3b2aa07" ON "user_holidays_holiday" ("holidayId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_holidays_holiday" ADD CONSTRAINT "FK_12b545a6aeab62420e59c048fd3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_holidays_holiday" ADD CONSTRAINT "FK_992d7ded99a3f36362f3b2aa075" FOREIGN KEY ("holidayId") REFERENCES "holiday"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `INSERT INTO "user" ("id") VALUES ('11111111-1111-1111-1111-111111111111')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_holidays_holiday" DROP CONSTRAINT "FK_992d7ded99a3f36362f3b2aa075"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_holidays_holiday" DROP CONSTRAINT "FK_12b545a6aeab62420e59c048fd3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_992d7ded99a3f36362f3b2aa07"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_12b545a6aeab62420e59c048fd"`,
    );
    await queryRunner.query(`DROP TABLE "user_holidays_holiday"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "holiday"`);
  }
}
