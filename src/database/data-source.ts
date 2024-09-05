// src/database/data-source.ts

import constants from 'src/config/constants';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: constants.DB_HOST,
  port: +constants.DB_PORT,
  database: constants.DB_DATABASE,
  username: constants.DB_USER,
  password: constants.DB_PASS,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*.ts'],
  synchronize: false,
});

export default dataSource;
