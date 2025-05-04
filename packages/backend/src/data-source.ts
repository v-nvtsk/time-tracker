import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { configuration } from './app.configuration';

dotenv.config({ path: '.env.local' });
const config = configuration();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
