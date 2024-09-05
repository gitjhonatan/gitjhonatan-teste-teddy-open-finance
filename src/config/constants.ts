import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const JWT_SECRET = configService.getOrThrow('JWT_SECRET');
const APP_URL = configService.getOrThrow('APP_URL');
const DB_HOST = configService.getOrThrow('DB_HOST');
const DB_PORT = configService.getOrThrow('DB_PORT');
const DB_DATABASE = configService.getOrThrow('DB_DATABASE');
const DB_USER = configService.getOrThrow('DB_USER');
const DB_PASS = configService.getOrThrow('DB_PASS');

const constants = {
  JWT_SECRET,
  APP_URL,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASS,
};
export default constants;
