import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1743516833850 implements MigrationInterface {
    name = 'InitialDatabase1743516833850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("countryCode" character varying NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_723b232a5bfd0fc0c36973e59f5" PRIMARY KEY ("countryCode"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
