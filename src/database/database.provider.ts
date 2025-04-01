import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const databaseProvider: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, 'entity', '*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsRun: false,
};

export const database = new DataSource(databaseProvider);
